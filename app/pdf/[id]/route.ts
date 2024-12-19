import { isDeployedToProd } from '@/lib/environment';
import { fetchWithTraceparent, generateTraceParent } from '@/lib/fetch';
import { getLanguageFromHeaders } from '@/lib/get-language';
import { getOboToken } from '@/lib/get-obo-token';
import { Audience } from '@/lib/types';
import { validateResponse } from '@/lib/validate-response';
import { Languages } from '@/locales';
import { logger } from '@navikt/next-logger';
import type { NextRequest } from 'next/server';

const KABAL_DOMAIN = isDeployedToProd ? 'https://kabal-api.nav.no' : 'https://kabal-api.intern.dev.nav.no';

export async function GET(req: NextRequest, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const token = await getOboToken(Audience.KABAL_API, req.headers);

  const url = `${KABAL_DOMAIN}/api/innsyn/documents/${id}`;
  const traceparent = generateTraceParent();
  const headers = { Authorization: `Bearer ${token}`, traceparent };

  const response = await fetchWithTraceparent(url, { headers });

  logger.debug({ msg: url, status: response.status, 'x-traceparent': traceparent });

  const lang = getLanguageFromHeaders(req.headers);
  await validateResponse(response, lang, ERROR_MESSAGE);

  const blob = await response.blob();

  return new Response(blob, { headers: { 'Content-Type': 'application/pdf' } });
}

const ERROR_MESSAGE: Record<Languages, string> = {
  [Languages.NB]: 'Kunne ikke hente dokument',
  [Languages.NN]: 'Kunne ikkje hente dokument',
  [Languages.EN]: 'Failed to fetch document',
};
