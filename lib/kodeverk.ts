import { isDeployed } from '@/lib/environment';
import { fetchWithTraceparent } from '@/lib/fetch';
import { validateResponse } from '@/lib/validate-response';
import { Languages, type Translation } from '@/locales';

export const API_URL = isDeployed
  ? 'http://klage-kodeverk-api/kodeverk'
  : 'https://klage-kodeverk-api.intern.dev.nav.no/kodeverk';

export interface Ytelse {
  id: string;
  navn: string;
}

export const getYtelseName = async (id: string, lang: Languages): Promise<string> => {
  const response = await getYtelser(lang);

  return response.find((ytelse) => ytelse.id === id)?.navn ?? id;
};

const getYtelser = async (lang: Languages): Promise<Ytelse[]> => {
  const url = `${API_URL}/innsendingsytelser/${lang}`;

  const res = await fetchWithTraceparent(url, { Accept: 'application/json' });

  return (await validateResponse(res, lang, FAILED_TO_FETCH)) ?? res.json();
};

const FAILED_TO_FETCH: Translation = {
  [Languages.NB]: 'Kunne ikke hente ytelser',
  [Languages.NN]: 'Kunne ikkje hente ytelser',
  [Languages.EN]: 'Failed to fetch ytelser',
};
