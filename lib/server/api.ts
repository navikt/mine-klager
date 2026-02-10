import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { isLocal } from '@/lib/environment';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import { getLogger } from '@/lib/logger';
import { getFromKabal } from '@/lib/server/fetch';
import { getLanguageFromHeaders } from '@/lib/server/get-language';
import type { GetSakerResponse, Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

const logger = getLogger('api');

const SAKER_API_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/api/saker' : 'http://kabal-api/api/innsyn/saker';

export const getSaker = async (headers: Headers): Promise<GetSakerResponse> => {
  const lang = getLanguageFromHeaders(headers);

  try {
    const res = await (isLocal ? fetch(SAKER_API_URL, { headers }) : getFromKabal(SAKER_API_URL, headers));

    if (res.status === 401) {
      logger.warn('Unauthorized fetch of cases');
      throw new UnauthorizedError(lang);
    }

    if (!res.ok) {
      logger.error(`Failed to fetch cases - ${res.status}`);
      throw new InternalServerError(res.status, FAILED_TO_FETCH[lang], lang);
    }

    return res.json();
  } catch (error) {
    logger.error('Failed to fetch cases', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? (error.stack ?? '') : '',
    });

    throw error;
  }
};

export const getSak = async (headers: ReadonlyHeaders, id: string): Promise<Sak | undefined> => {
  const response = await getSaker(headers);

  return response.saker.find((sak) => sak.id === id);
};

const FAILED_TO_FETCH: Translation = {
  [Language.NB]: 'Kunne ikke hente saker',
  [Language.NN]: 'Kunne ikkje hente saker',
  [Language.EN]: 'Failed to fetch cases',
};
