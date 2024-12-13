import { type Audience, UnauthorizedError } from '@/lib/types';
import { requestOboToken, validateToken } from '@navikt/oasis';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

export const getOboToken = async (audience: Audience, headers: ReadonlyHeaders) => {
  const authorization = headers.get('authorization');

  if (authorization === null) {
    throw new UnauthorizedError('Missing authorization header');
  }

  const [, token] = authorization.split(' ');

  const validation = await validateToken(token);

  if (!validation.ok) {
    throw new UnauthorizedError('Invalid token');
  }

  const obo = await requestOboToken(token, `${process.env.NAIS_CLUSTER_NAME}:klage:${audience}`);

  if (!obo.ok) {
    throw new UnauthorizedError(`Failed to get on-behalf-of token for audience ${audience}`);
  }

  return obo.token;
};
