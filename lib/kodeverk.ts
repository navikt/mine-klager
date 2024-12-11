import { isDeployed } from '@/lib/environment';
import type { Languages } from '@/locales';

export const API_URL = isDeployed
  ? 'http://klage-kodeverk-api/kodeverk'
  : 'https://klage-kodeverk-api.intern.dev.nav.no/kodeverk';

export interface Ytelse {
  id: string;
  navn: string;
}

export const getYtelseName = async (token: string, id: string, lang: Languages): Promise<string> => {
  const ytelser = await getYtelser(token, lang);

  return ytelser.find((ytelse) => ytelse.id === id)?.navn ?? id;
};

const OPTIONS = { headers: { Accept: 'application/json' } };

const getYtelser = async (token: string, lang: Languages): Promise<Ytelse[]> => {
  const res = await fetch(`${API_URL}/ytelser/simple/${lang}`, {
    ...OPTIONS,
    headers: { ...OPTIONS.headers, Authorization: `Bearer ${token}` },
  });

  return await res.json();
};
