import { isDeployed } from '@/lib/environment';
import { fetchWithTraceparent } from '@/lib/fetch';
import { validateResponse } from '@/lib/validate-response';
import { Languages } from '@/locales';
import { ytelserSimple } from '@/mockdata/ytelser-simple';

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

const OPTIONS = { headers: { Accept: 'application/json' } };

const getYtelser = async (lang: Languages): Promise<Ytelse[]> => {
  if (isDeployed) {
    return ytelserSimple;
  }

  const res = await fetchWithTraceparent(`${API_URL}/ytelser/simple/${lang}`, OPTIONS);

  await validateResponse(res, lang, FAILED_TO_FETCH);

  return await res.json();
};

const FAILED_TO_FETCH: Record<Languages, string> = {
  [Languages.NB]: 'Kunne ikke hente ytelser',
  [Languages.NN]: 'Kunne ikkje hente ytelser',
  [Languages.EN]: 'Failed to fetch ytelser',
};
