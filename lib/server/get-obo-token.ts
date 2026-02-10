import { requestOboToken, validateToken } from '@navikt/oasis';
import { trace } from '@opentelemetry/api';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { unauthorized } from 'next/navigation';
import { getLogger } from '@/lib/logger';
import type { Audience } from '@/lib/types';

const logger = getLogger('obo-token');

const tracer = trace.getTracer('mine-klager');

export const getOboToken = async (audience: Audience, headers: ReadonlyHeaders) =>
  tracer.startActiveSpan('getOboToken', async (span) => {
    try {
      span.setAttribute('token.audience', audience);

      const authorization = headers.get('authorization');

      if (authorization === null) {
        logger.error('Missing authorization header');
        unauthorized();
      }

      const [, token] = authorization.split(' ');

      const validation = await validateToken(token);

      if (!validation.ok) {
        logger.error('Invalid token');
        unauthorized();
      }

      const obo = await requestOboToken(token, `${process.env.NAIS_CLUSTER_NAME}:klage:${audience}`);

      if (!obo.ok) {
        logger.error(`Failed to get on-behalf-of token for audience: ${audience}`);
        unauthorized();
      }

      return obo.token;
    } finally {
      span.end();
    }
  });
