import { SpanStatusCode, trace } from '@opentelemetry/api';
import { getLogger } from '@/lib/logger';
import { getOboToken } from '@/lib/server/get-obo-token';
import { recordSpanError } from '@/lib/tracing';
import { Audience } from '@/lib/types';

const logger = getLogger('fetch');

const prepareHeaders = async (incomingHeaders: Headers) => {
  try {
    const token = await getOboToken(Audience.KABAL_API, incomingHeaders);

    return { authorization: `Bearer ${token}` } satisfies HeadersInit;
  } catch (error) {
    logger.error('Failed to get OBO token', {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? (error.stack ?? '') : '',
    });

    throw new Error('Failed to get OBO token', { cause: error });
  }
};

export const getFromKabal = async (url: string, incomingHeaders: Headers): ReturnType<typeof fetch> => {
  const tracer = trace.getTracer('mine-klager');

  return tracer.startActiveSpan(`getFromKabal ${url}`, async (span) => {
    try {
      const headers = await prepareHeaders(incomingHeaders);

      const res = await fetch(url, { method: 'GET', headers });

      span.setAttribute('http.status_code', res.status);

      if (!res.ok) {
        span.setStatus({ code: SpanStatusCode.ERROR, message: `Failed to fetch from Kabal - ${res.status}` });
      } else {
        span.setStatus({ code: SpanStatusCode.OK, message: 'Successfully fetched from Kabal' });
      }

      return res;
    } catch (error) {
      recordSpanError(span, error);

      throw error;
    } finally {
      span.end();
    }
  });
};
