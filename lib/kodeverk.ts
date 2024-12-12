import { getOboToken } from '@/lib/auth';
import { isDeployed } from '@/lib/environment';
import type { ApiResponse } from '@/lib/types';
import type { Languages } from '@/locales';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { Audience } from './types';

export const API_URL = isDeployed
  ? 'http://klage-kodeverk-api/kodeverk'
  : 'https://klage-kodeverk-api.intern.dev.nav.no/kodeverk';

export interface Ytelse {
  id: string;
  navn: string;
}

export const getYtelseName = async (headers: ReadonlyHeaders, id: string, lang: Languages): ApiResponse<string> => {
  const response = await getYtelser(headers, lang);

  if (!response.ok) {
    return response;
  }

  return {
    ok: true,
    error: undefined,
    value: response.value.find((ytelse) => ytelse.id === id)?.navn ?? id,
  };
};

const OPTIONS = { headers: { Accept: 'application/json' } };

const getYtelser = async (headers: ReadonlyHeaders, lang: Languages): ApiResponse<Ytelse[]> => {
  try {
    const token = await getOboToken(Audience.KODEVERK_API, headers);

    const res = await fetch(`${API_URL}/ytelser/simple/${lang}`, {
      ...OPTIONS,
      headers: { ...OPTIONS.headers, Authorization: `Bearer ${token}` },
    });

    if (!res.ok) {
      return { ok: false, error: new Error('Failed to fetch ytelser'), value: undefined };
    }

    return { ok: true, error: undefined, value: await res.json() };
  } catch (error) {
    return { ok: false, error, value: undefined };
  }
};
