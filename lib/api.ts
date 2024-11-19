import { isLocal } from '@/lib/environment';
import { getFromKabal } from '@/lib/fetch';
import { getLanguageFromHeaders } from '@/lib/get-language';
import type { GetSakerResponse, Sak } from '@/lib/types';
import { validateResponse } from '@/lib/validate-response';
import { Languages, type Translation } from '@/locales';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

const SAKER_API_URL = isLocal ? 'https://mine-klager.intern.dev.nav.no/api/saker' : 'http://kabal-api/api/innsyn/saker';

export const getSaker = async (headers: Headers): Promise<GetSakerResponse> => {
  const res = await (isLocal ? fetch(SAKER_API_URL, { headers }) : getFromKabal(SAKER_API_URL, headers));

  const lang = getLanguageFromHeaders(headers);

  return (await validateResponse(res, lang, FAILED_TO_FETCH)) ?? res.json();
};

export const getSak = async (headers: ReadonlyHeaders, id: string): Promise<Sak | undefined> => {
  const response = await getSaker(headers);

  return response.saker.find((sak) => sak.id === id);
};

const FAILED_TO_FETCH: Translation = {
  [Languages.NB]: 'Kunne ikke hente saker',
  [Languages.NN]: 'Kunne ikkje hente saker',
  [Languages.EN]: 'Failed to fetch cases',
};
