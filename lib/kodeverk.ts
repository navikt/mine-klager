import { trace } from '@opentelemetry/api';
import { isDeployed } from '@/lib/environment';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import { getLogger } from '@/lib/logger';
import { recordSpanError } from '@/lib/tracing';
import { Language, type Translation } from '@/locales';

const logger = getLogger('kodeverk');
const tracer = trace.getTracer('mine-klager');

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

  return tracer.startActiveSpan(`getYtelser ${url}`, async (span) => {
    try {
      span.setAttribute('kodeverk.lang', lang);

      const res = await fetch(url, { headers: { accept: 'application/json' } });

      if (res.status === 401) {
        throw new UnauthorizedError(lang);
      }

      if (!res.ok) {
        throw new InternalServerError(res.status, `${FAILED_TO_FETCH[lang]}: ${await res.text()}`, lang);
      }

      return res.json();
    } catch (error) {
      if (error instanceof InternalServerError || error instanceof UnauthorizedError) {
        throw error;
      }

      recordSpanError(span, error);

      logger.error('Failed to fetch kodeverk', {
        error: error instanceof Error ? error.message : 'Unknown error',
      });

      throw new InternalServerError(500, FAILED_TO_FETCH[lang], lang, {
        cause: error instanceof Error ? error : undefined,
      });
    } finally {
      span.end();
    }
  });
};

const FAILED_TO_FETCH: Translation = {
  [Language.NB]: 'Kunne ikke hente ytelser',
  [Language.NN]: 'Kunne ikkje hente ytelser',
  [Language.EN]: 'Failed to fetch benefits',
};
