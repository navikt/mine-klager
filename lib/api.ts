import { browserLog } from '@/lib/browser-log';
import { isDeployed, isLocal } from '@/lib/environment';
import { fetchWithTraceparent, generateTraceParent } from '@/lib/fetch';
import { getLanguageFromHeaders } from '@/lib/get-language';
import { getOboToken } from '@/lib/get-obo-token';
import type { GetSakerResponse, Sak } from '@/lib/types';
import { validateResponse } from '@/lib/validate-response';
import { Languages } from '@/locales';
import { saker } from '@/mockdata/saker';
import { logger } from '@navikt/next-logger';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { Audience } from './types';

const API_URL = isLocal ? 'https://kabal-api.intern.dev.nav.no/api/innsyn' : 'http://kabal-api/api/innsyn';

export const getSaker = async (headers: ReadonlyHeaders): Promise<GetSakerResponse> => {
  if (!isDeployed) {
    return saker;
  }

  const token = await getOboToken(Audience.KABAL_API, headers);

  const url = `${API_URL}/saker`;

  const traceparent = generateTraceParent();
  const res = await fetchWithTraceparent(url, {
    headers: {
      Authorization: `Bearer ${token}`,
      traceparent,
    },
  });

  logger.debug({ msg: url, status: res.status, 'x-traceparent': traceparent });

  await validateResponse(res, getLanguageFromHeaders(headers), FAILED_TO_FETCH);

  const json = await res.json();

  browserLog.debug(`Response from ${url}:`, json);

  return json;
};

export const getSak = async (headers: ReadonlyHeaders, id: string): Promise<Sak | undefined> => {
  const response = await getSaker(headers);

  return response.saker.find((sak) => sak.id === id);
};

const FAILED_TO_FETCH: Record<Languages, string> = {
  [Languages.NB]: 'Kunne ikke hente saker',
  [Languages.NN]: 'Kunne ikkje hente saker',
  [Languages.EN]: 'Failed to fetch cases',
};
