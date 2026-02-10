import { trace } from '@opentelemetry/api';
import { headers } from 'next/headers';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import { getSaker } from '@/lib/server/api';
import { getDecoratorLanguage } from '@/lib/server/get-language';
import type { Translation } from '@/locales';

export const dynamic = 'force-dynamic';

const tracer = trace.getTracer('mine-klager');

export async function GET() {
  return tracer.startActiveSpan('GET /api/saker', async (span) => {
    try {
      const saker = await getSaker(await headers());

      span.setAttribute('response.status', 200);

      return Response.json(saker);
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        span.setAttribute('response.status', 401);

        return new Response(error.message, { status: 401 });
      }

      if (error instanceof InternalServerError) {
        span.setAttribute('response.status', 500);

        return new Response(error.message, { status: 500 });
      }

      const lang = await getDecoratorLanguage();

      span.setAttribute('response.status', 500);

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
