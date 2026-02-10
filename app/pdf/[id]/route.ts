import { trace } from '@opentelemetry/api';
import type { NextRequest } from 'next/server';
import { isLocal } from '@/lib/environment';
import { getLogger } from '@/lib/logger';
import { getFromKabal } from '@/lib/server/fetch';
import { getLanguageFromHeaders } from '@/lib/server/get-language';
import { Language, type Translation } from '@/locales';

const logger = getLogger('pdf');

const tracer = trace.getTracer('mine-klager');

const PDF_BASE_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/pdf' : 'http://kabal-api/api/innsyn/documents';

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { headers } = req;
  const lang = getLanguageFromHeaders(headers);

  const { id } = await params;

  return tracer.startActiveSpan('GET /pdf/[id]', async (span) => {
    try {
      span.setAttribute('document.id', id);

      const url = `${PDF_BASE_URL}/${id}`;
      const res = await (isLocal ? fetch(url, { method: 'GET', headers }) : getFromKabal(url, headers));

      if (!res.ok) {
        span.setAttribute('http.status_code', res.status);

        return new Response(ERROR_MESSAGE[lang], { status: res.status });
      }

      return res;
    } catch (error) {
      logger.error('Failed to fetch document', {
        error: error instanceof Error ? error.message : 'Unknown error',
        stack: error instanceof Error ? (error.stack ?? '') : '',
      });

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
