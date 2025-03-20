import { isLocal } from '@/lib/environment';
import { getLogger } from '@/lib/logger';
import { generateTraceParent, getFromKabal } from '@/lib/server/fetch';
import { getLanguageFromHeaders } from '@/lib/server/get-language';
import { Language, type Translation } from '@/locales';
import type { NextRequest } from 'next/server';

const logger = getLogger('pdf');

const PDF_BASE_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/pdf' : 'http://kabal-api/api/innsyn/documents';

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { headers } = req;
  const lang = getLanguageFromHeaders(headers);

  const { id } = await params;
  const url = `${PDF_BASE_URL}/${id}`;
  const { traceparent, trace_id, span_id } = generateTraceParent();

  try {
    const res = await (isLocal ? fetch(url, { method: 'GET', headers }) : getFromKabal(url, headers, traceparent));

    if (!res.ok) {
      return new Response(ERROR_MESSAGE[lang], { status: res.status });
    }

    return res;
  } catch (error) {
    logger.error('Failed to fetch document', trace_id, span_id, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? (error.stack ?? '') : '',
    });

    return new Response(ERROR_MESSAGE[lang], { status: 500 });
  }
}

const ERROR_MESSAGE: Translation = {
  [Language.NB]: 'Kunne ikke hente dokumentet.',
  [Language.NN]: 'Kunne ikkje hente dokumentet.',
  [Language.EN]: 'Failed to fetch the document.',
};
