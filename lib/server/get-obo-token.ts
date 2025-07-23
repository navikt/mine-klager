import { requestOboToken, validateToken } from '@navikt/oasis';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { unauthorized } from 'next/navigation';
import { getLogger } from '@/lib/logger';
import { getTraceparent } from '@/lib/server/fetch';
import type { Audience } from '@/lib/types';

const logger = getLogger('obo-token');

export const getOboToken = async (audience: Audience, headers: ReadonlyHeaders) => {
  const authorization = headers.get('authorization');
  const { traceId, spanId } = getTraceparent(headers);

  if (authorization === null) {
    logger.error('Missing authorization header', traceId, spanId);
    unauthorized();
  }

  const [, token] = authorization.split(' ');

  const validation = await validateToken(token);

  if (!validation.ok) {
    logger.error('Invalid token', traceId, spanId);
    unauthorized();
  }

  const obo = await requestOboToken(token, `${process.env.NAIS_CLUSTER_NAME}:klage:${audience}`);

  if (!obo.ok) {
    logger.error(`Failed to get on-behalf-of token for audience: ${audience}`, traceId, spanId);
    unauthorized();
  }

  return obo.token;
};
