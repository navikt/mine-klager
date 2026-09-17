import { trace } from '@opentelemetry/api';
import { headers } from 'next/headers';
import { getSakerResponse } from '@/lib/server/api';
import { getDecoratorLanguage } from '@/lib/server/get-language';
import { recordSpanError } from '@/lib/tracing';
import type { Translation } from '@/locales';

export const dynamic = 'force-dynamic';

const tracer = trace.getTracer('mine-klager');

export async function GET() {
  return tracer.startActiveSpan('GET /api/saker', async (span) => {
    try {
      const response = await getSakerResponse(await headers());

      span.setAttribute('response.status', response.status);

      return response;
    } catch (error) {
      recordSpanError(span, error);

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
