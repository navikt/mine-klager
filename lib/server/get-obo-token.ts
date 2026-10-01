import { requestOboToken, validateToken } from '@navikt/oasis';
import { trace } from '@opentelemetry/api';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import type { Audience } from '@/lib/types';

const tracer = trace.getTracer('mine-klager');

// Wonderwall autologin guarantees an active session before requests reach the app.
// Any failure here is therefore a server-side problem, not a logged out user.
export const getOboToken = async (audience: Audience, headers: ReadonlyHeaders) =>
  tracer.startActiveSpan('getOboToken', async (span) => {
    try {
      span.setAttribute('token.audience', audience);

      const authorization = headers.get('authorization');

      if (authorization === null) {
        throw new Error('Missing authorization header');
      }

      const [, token] = authorization.split(' ');

      const validation = await validateToken(token);

      if (!validation.ok) {
        throw new Error(`Invalid token (${validation.errorType}): ${validation.error.message}`, {
          cause: validation.error,
        });
      }

      const obo = await requestOboToken(token, `${process.env.NAIS_CLUSTER_NAME}:klage:${audience}`);

      if (!obo.ok) {
        throw new Error(`Failed to get on-behalf-of token for audience ${audience}: ${obo.error.message}`, {
          cause: obo.error,
        });
      }

      return obo.token;
    } finally {
      span.end();
    }
  });
