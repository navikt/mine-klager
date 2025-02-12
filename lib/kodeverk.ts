import { isDeployed } from '@/lib/environment';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import { generateTraceParent } from '@/lib/fetch';
import { getLogger } from '@/lib/logger';
import { Language, type Translation } from '@/locales';

const logger = getLogger('kodeverk');

export const API_URL = isDeployed
  ? 'http://klage-kodeverk-api/kodeverk'
  : 'https://klage-kodeverk-api.intern.dev.nav.no/kodeverk';

export interface Ytelse {
  id: string;
  navn: string;
}

export const getYtelseName = async (id: string, lang: Language): Promise<string> => {
  const response = await getYtelser(lang);

  return response.find((ytelse) => ytelse.id === id)?.navn ?? id;
};

const getYtelser = async (lang: Language): Promise<Ytelse[]> => {
  const url = `${API_URL}/innsendingsytelser/${lang}`;

  const { traceparent, trace_id, span_id } = generateTraceParent();

  try {
    const res = await fetch(url, { headers: { Accept: 'application/json', traceparent } });

    if (res.status === 401) {
      throw new UnauthorizedError(lang);
    }

    if (!res.ok) {
      throw new InternalServerError(res.status, `${FAILED_TO_FETCH[lang]}: ${await res.text()}`, lang);
    }

    return res.json();
  } catch (error) {
    logger.error('Failed to fetch kodeverk', trace_id, span_id, {
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    throw new InternalServerError('Network error', FAILED_TO_FETCH[lang], lang);
  }
};

const FAILED_TO_FETCH: Translation = {
  [Language.NB]: 'Kunne ikke hente ytelser',
  [Language.NN]: 'Kunne ikkje hente ytelser',
  [Language.EN]: 'Failed to fetch benefits',
};
