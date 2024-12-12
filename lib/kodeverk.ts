import { isDeployed } from '@/lib/environment';
import type { ApiResponse } from '@/lib/types';
import type { Languages } from '@/locales';

export const API_URL = isDeployed
  ? 'http://klage-kodeverk-api/kodeverk'
  : 'https://klage-kodeverk-api.intern.dev.nav.no/kodeverk';

export interface Ytelse {
  id: string;
  navn: string;
}

export const getYtelseName = async (id: string, lang: Languages): ApiResponse<string> => {
  const response = await getYtelser(lang);

  if (!response.ok) {
    return response;
  }

  const value = response.value.find((ytelse) => ytelse.id === id)?.navn ?? id;

  return { ok: true, error: undefined, value };
};

const OPTIONS = { headers: { Accept: 'application/json' } };

const getYtelser = async (lang: Languages): ApiResponse<Ytelse[]> => {
  try {
    const res = await fetch(`${API_URL}/ytelser/simple/${lang}`, OPTIONS);

    if (!res.ok) {
      return { ok: false, error: new Error('Failed to fetch ytelser'), value: undefined };
    }

    const value = await res.json();

    return { ok: true, error: undefined, value };
  } catch (error) {
    return { ok: false, error, value: undefined };
  }
};
