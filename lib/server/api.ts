import { headers as getHeaders } from 'next/headers';
import { cache } from 'react';
import { isDeployedToDev, isLocal } from '@/lib/environment';
import { InternalServerError } from '@/lib/errors';
import { getLogger } from '@/lib/logger';
import { getFromKabal } from '@/lib/server/fetch';
import { type GetSakerResponse, isCaseType, type Sak } from '@/lib/types';

const logger = getLogger('api');

const SAKER_API_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/api/saker' : 'http://kabal-api/api/innsyn/saker';

export const getSakerResponse = async (headers: Headers): Promise<Response> => getFromKabal(SAKER_API_URL, headers);

/**
 * Cached per request, so pages calling it from both `generateMetadata` and the page component only fetch once.
 */
export const getSupportedSaker = cache(async (): Promise<Sak[]> => {
  const saker = await fetchSaker();

  const supportedSaker: Sak[] = [];
  const unsupportedSaker: Sak[] = [];

  for (const sak of saker) {
    if (isCaseType(sak.typeId)) {
      supportedSaker.push(sak);
    } else {
      unsupportedSaker.push(sak);
    }
  }

  if (unsupportedSaker.length !== 0) {
    const cases = unsupportedSaker.map(({ id, typeId }) => `Case ${id} of type ${typeId}`).join(', ');

    if (isLocal || isDeployedToDev) {
      logger.info('Unsupported cases found:', { cases });
    } else {
      logger.warn('Unsupported cases found:', { cases });
    }
  }

  return supportedSaker;
});

export const getSupportedSak = cache(async (id: string): Promise<Sak | undefined> => {
  const saker = await getSupportedSaker();

  return saker.find((sak) => sak.id === id);
});

// Fetch failures and non-OK statuses are logged by `getFromKabal`.
const fetchSaker = async (): Promise<Sak[]> => {
  let res: Response;

  try {
    res = await getSakerResponse(await getHeaders());
  } catch (error) {
    throw new InternalServerError(500, FAILED_TO_FETCH, { cause: error instanceof Error ? error : undefined });
  }

  if (!res.ok) {
    throw new InternalServerError(res.status, FAILED_TO_FETCH);
  }

  try {
    const { saker }: GetSakerResponse = await res.json();

    return saker;
  } catch (error) {
    logger.error('Failed to parse cases from Kabal', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    throw new InternalServerError(500, FAILED_TO_FETCH, { cause: error instanceof Error ? error : undefined });
  }
};

const FAILED_TO_FETCH = 'Failed to fetch cases from Kabal';
