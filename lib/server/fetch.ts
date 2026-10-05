import { SpanStatusCode, trace } from '@opentelemetry/api';
import { isLocal } from '@/lib/environment';
import { getLogger } from '@/lib/logger';
import { getOboToken } from '@/lib/server/get-obo-token';
import { recordSpanError } from '@/lib/tracing';
import { Audience } from '@/lib/types';

const logger = getLogger('kabal');
const tracer = trace.getTracer('mine-klager');

/**
 * Fetches from Kabal and logs failures, so callers should not log them again.
 * Locally, `url` points to the deployed dev app, which handles auth with the forwarded headers.
 */
export const getFromKabal = async (url: string, incomingHeaders: Headers): ReturnType<typeof fetch> =>
  tracer.startActiveSpan(`getFromKabal ${url}`, async (span) => {
    try {
      const headers: HeadersInit = isLocal
        ? incomingHeaders
        : { authorization: `Bearer ${await getOboToken(Audience.KABAL_API, incomingHeaders)}` };

      const res = await fetch(url, { method: 'GET', headers });

      span.setAttribute('http.status_code', res.status);

      if (res.ok) {
        span.setStatus({ code: SpanStatusCode.OK, message: 'Successfully fetched from Kabal' });

        return res;
      }

      span.setStatus({ code: SpanStatusCode.ERROR, message: `Failed to fetch from Kabal - ${res.status}` });

      // Wonderwall autologin guarantees an active session, so 401 means our token is wrong.
      const log = res.status === 401 || res.status >= 500 ? logger.error : logger.warn;

      log(`Kabal responded with status ${res.status}`, { url, status: res.status, statusText: res.statusText });

      return res;
    } catch (error) {
      recordSpanError(span, error);

      logger.error('Failed to fetch from Kabal', { url }, error);

      throw error;
    } finally {
      span.end();
    }
  });
