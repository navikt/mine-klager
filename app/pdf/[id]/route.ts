import { trace } from '@opentelemetry/api';
import type { NextRequest } from 'next/server';
import { isLocal } from '@/lib/environment';
import { getFromKabal } from '@/lib/server/fetch';
import { getLanguageFromHeaders } from '@/lib/server/get-language';
import { recordSpanError } from '@/lib/tracing';
import { Language, type Translation } from '@/locales';

const tracer = trace.getTracer('mine-klager');

const PDF_BASE_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/pdf' : 'http://kabal-api/api/innsyn/documents';

interface Params {
  id: string;
}

// Kabal failures are logged by `getFromKabal`.
export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { headers } = req;
  const lang = getLanguageFromHeaders(headers);

  const { id } = await params;

  return tracer.startActiveSpan('GET /pdf/[id]', async (span) => {
    try {
      span.setAttribute('document.id', id);

      const res = await getFromKabal(`${PDF_BASE_URL}/${id}`, headers);

      if (!res.ok) {
        span.setAttribute('http.status_code', res.status);

        return new Response(ERROR_MESSAGE[lang], { status: res.status });
      }

      return res;
    } catch (error) {
      recordSpanError(span, error);

      return new Response(ERROR_MESSAGE[lang], { status: 500 });
    } finally {
      span.end();
    }
  });
}

const ERROR_MESSAGE: Translation = {
  [Language.NB]: 'Kunne ikke hente dokumentet.',
  [Language.NN]: 'Kunne ikkje hente dokumentet.',
  [Language.EN]: 'Failed to fetch the document.',
};
