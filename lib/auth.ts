import { requestOboToken, validateToken } from '@navikt/oasis';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export enum Audience {
  KABAL_API = 'kabal-api',
  KODEVERK_API = 'klage-kodeverk-api',
}

export const getOboToken = async (audience: Audience, headers: ReadonlyHeaders) => {
  const authorization = headers.get('authorization');

  if (authorization === null) {
    return null;
  }

  const token = getAccessToken(authorization);

  const validation = await validateToken(token);

  if (!validation.ok) {
    return null;
  }

  const obo = await requestOboToken(token, `${process.env.NAIS_CLUSTER_NAME}:${audience}`);

  if (!obo.ok) {
    return null;
  }

  return obo.token;
};

const getAccessToken = (authorization: string) => {
  const [, token] = authorization.split(' ');

  return token;
};
