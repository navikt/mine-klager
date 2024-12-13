import { getOboToken } from '@/lib/auth';
import { isDeployed, isLocal } from '@/lib/environment';
import type { ApiResponse, Sak } from '@/lib/types';
import { saker } from '@/mockdata/saker';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { Audience } from './types';

const API_URL = isLocal ? 'https://kabal-api.intern.dev.nav.no/api/innsyn' : 'http://kabal-api/api/innsyn';

interface GetSakerResponse {
  saker: Sak[];
}

export const getSaker = async (headers: ReadonlyHeaders): ApiResponse<GetSakerResponse> => {
  if (!isDeployed) {
    return { ok: true, error: undefined, value: { saker: saker } };
  }

  try {
    const token = await getOboToken(Audience.KABAL_API, headers);

    const res = await fetch(`${API_URL}/saker`, { headers: { Authorization: `Bearer ${token}` } });

    if (!res.ok) {
      return { ok: false, error: new Error('Failed to fetch saker'), value: undefined };
    }

    return { ok: true, error: undefined, value: await res.json() };
  } catch (error) {
    return { ok: false, error, value: undefined };
  }
};

export const getSak = async (headers: ReadonlyHeaders, id: string): ApiResponse<Sak | undefined> => {
  const response = await getSaker(headers);

  if (!response.ok) {
    return response;
  }

  return {
    ok: true,
    error: undefined,
    value: response.value.saker.find((sak) => sak.id === id),
  };
};
