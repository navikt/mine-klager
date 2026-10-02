import { getToken, requestOboToken, validateToken } from '@navikt/oasis';
import { trace } from '@opentelemetry/api';
import type { Audience } from '@/lib/types';

const tracer = trace.getTracer('mine-klager');

// Wonderwall autologin and `proxy.ts` guarantee a valid token before requests reach the app.
// Any failure here is therefore a server-side problem, not a logged out user.
// The token is still validated here, so the data is protected even if the proxy matcher changes.
export const getOboToken = async (audience: Audience, headers: Headers) =>
  tracer.startActiveSpan('getOboToken', async (span) => {
    try {
      span.setAttribute('token.audience', audience);

      const token = getToken(headers);

      if (token === null) {
        throw new Error('Missing authorization header');
      }

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
