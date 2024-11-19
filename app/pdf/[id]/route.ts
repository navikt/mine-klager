import { isLocal } from '@/lib/environment';
import { getFromKabal } from '@/lib/fetch';
import { getLanguageFromHeaders } from '@/lib/get-language';
import { validateResponse } from '@/lib/validate-response';
import { Languages, type Translation } from '@/locales';
import type { NextRequest } from 'next/server';

export const dynamic = 'force-dynamic';

const PDF_BASE_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/pdf' : 'http://kabal-api/api/innsyn/documents';

interface Params {
  id: string;
}

export async function GET(req: NextRequest, { params }: { params: Promise<Params> }) {
  const { id } = await params;

  const url = `${PDF_BASE_URL}/${id}`;
  const { headers } = req;
  const res = await (isLocal ? fetch(url, { headers }) : getFromKabal(url, headers));

  const lang = getLanguageFromHeaders(headers);

  return (await validateResponse(res, lang, ERROR_MESSAGE)) ?? res;
}

const ERROR_MESSAGE: Translation = {
  [Languages.NB]: 'Kunne ikke hente dokument',
  [Languages.NN]: 'Kunne ikkje hente dokument',
  [Languages.EN]: 'Failed to fetch document',
};
