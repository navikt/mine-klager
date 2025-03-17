import { getTraceparent } from '@/lib/fetch';
import { getLogger } from '@/lib/logger';
import type { Audience } from '@/lib/types';
import { requestOboToken, validateToken } from '@navikt/oasis';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { unauthorized } from 'next/navigation';

const logger = getLogger('obo-token');

export const getOboToken = async (audience: Audience, headers: ReadonlyHeaders) => {
  const authorization = headers.get('authorization');
  const { trace_id, span_id } = getTraceparent(headers);

  logger.info(`Getting on-behalf-of token for ${audience}`, trace_id, span_id);

  if (authorization === null) {
    logger.error('Missing authorization header', trace_id, span_id);
    unauthorized();
  }

  const [, token] = authorization.split(' ');

  const validation = await validateToken(token);

  if (!validation.ok) {
    logger.error('Invalid token', trace_id, span_id);
    unauthorized();
  }

  const obo = await requestOboToken(token, `${process.env.NAIS_CLUSTER_NAME}:klage:${audience}`);

  if (!obo.ok) {
    logger.error(`Failed to get on-behalf-of token for audience: ${audience}`, trace_id, span_id);
    unauthorized();
  }

  logger.info(`Got on-behalf-of token for ${audience}: ${obo.token.substring(0, 100)}...`, trace_id, span_id);

  return obo.token;
};
