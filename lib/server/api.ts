import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { isDeployedToDev, isLocal } from '@/lib/environment';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import { getLogger } from '@/lib/logger';
import { getFromKabal } from '@/lib/server/fetch';
import { getLanguageFromHeaders } from '@/lib/server/get-language';
import { type GetSakerResponse, isCaseType, type Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

const logger = getLogger('api');

const SAKER_API_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/api/saker' : 'http://kabal-api/api/innsyn/saker';

export const getSakerResponse = async (headers: Headers): Promise<Response> =>
  isLocal ? fetch(SAKER_API_URL, { headers }) : getFromKabal(SAKER_API_URL, headers);

export const getSupportedSaker = async (headers: Headers): Promise<Sak[]> => {
  const lang = getLanguageFromHeaders(headers);

  try {
    const res = await getSakerResponse(headers);

    if (res.status === 401) {
      logger.warn('Unauthorized when fetching cases from Kabal', {
        status: res.status,
        statusText: res.statusText,
      });

      throw new UnauthorizedError(lang);
    }

    if (!res.ok) {
      logger.error(`Kabal responded with status ${res.status} when fetching cases`, {
        status: res.status,
        statusText: res.statusText,
      });

      throw new InternalServerError(res.status, FAILED_TO_FETCH[lang], lang);
    }

    const { saker }: GetSakerResponse = await res.json();

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
  } catch (error) {
    if (error instanceof InternalServerError || error instanceof UnauthorizedError) {
      throw error;
    }

    logger.error('Failed to fetch cases from Kabal', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? (error.stack ?? '') : '',
    });

    throw new InternalServerError(500, FAILED_TO_FETCH[lang], lang, {
      cause: error instanceof Error ? error : undefined,
    });
  }
};

export const getSupportedSak = async (headers: ReadonlyHeaders, id: string): Promise<Sak | undefined> => {
  const saker = await getSupportedSaker(headers);

  return saker.find((sak) => sak.id === id);
};

const FAILED_TO_FETCH: Translation = {
  [Language.NB]: 'Kunne ikke hente saker',
  [Language.NN]: 'Kunne ikkje hente saker',
  [Language.EN]: 'Failed to fetch cases',
};
