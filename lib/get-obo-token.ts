import type { Audience } from '@/lib/types';
import { requestOboToken, validateToken } from '@navikt/oasis';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { unauthorized } from 'next/navigation';

export const getOboToken = async (audience: Audience, headers: ReadonlyHeaders) => {
  const authorization = headers.get('authorization');

  if (authorization === null) {
    console.error('Missing authorization header');
    unauthorized();
  }

  const [, token] = authorization.split(' ');

  const validation = await validateToken(token);

  if (!validation.ok) {
    console.error('Invalid token');
    unauthorized();
  }

  const obo = await requestOboToken(token, `${process.env.NAIS_CLUSTER_NAME}:klage:${audience}`);

  if (!obo.ok) {
    console.error(`Failed to get on-behalf-of token for audience: ${audience}`);
    unauthorized();
  }

  return obo.token;
};
