import { trace } from '@opentelemetry/api';
import { headers } from 'next/headers';
import { getLogger } from '@/lib/logger';
import { getSakerResponse } from '@/lib/server/api';
import { getDecoratorLanguage } from '@/lib/server/get-language';
import { recordSpanError } from '@/lib/tracing';
import type { Translation } from '@/locales';

export const dynamic = 'force-dynamic';

const tracer = trace.getTracer('mine-klager');
const logger = getLogger('api-saker');

export async function GET() {
  return tracer.startActiveSpan('GET /api/saker', async (span) => {
    try {
      const response = await getSakerResponse(await headers());

      span.setAttribute('response.status', response.status);

      if (!response.ok) {
        const log = response.status >= 500 ? logger.error : logger.warn;

        log(`Kabal responded with status ${response.status} when fetching cases`, {
          status: response.status,
          statusText: response.statusText,
        });
      }

      return response;
    } catch (error) {
      recordSpanError(span, error);

      logger.error('Failed to fetch cases', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? (error.stack ?? '') : '',
      });

      span.setAttribute('response.status', 500);

      const lang = await getDecoratorLanguage();

      return new Response(UNKNOWN_ERROR[lang], { status: 500 });
    } finally {
      span.end();
    }
  });
}

const UNKNOWN_ERROR: Translation = {
  nb: 'Ukjent feil',
  nn: 'Ukjend feil',
  en: 'Unknown error',
};
