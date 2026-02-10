import { getLogger } from '@/lib/logger';
import { getOboToken } from '@/lib/server/get-obo-token';
import { Audience } from '@/lib/types';

const logger = getLogger('fetch');

const prepareHeaders = async (incomingHeaders: Headers, traceparent: string, traceId: string, spanId: string) => {
  try {
    const token = await getOboToken(Audience.KABAL_API, incomingHeaders);

    const headers: HeadersInit = { authorization: `Bearer ${token}` };

    if (traceparent !== undefined) {
      headers.traceparent = traceparent;
    }

    return headers;
  } catch (error) {
    logger.error('Failed to get OBO token', traceId, spanId, {
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? (error.stack ?? '') : '',
    });

    throw new Error('Failed to get OBO token');
  }
};

export const getFromKabal = async (
  url: string,
  incomingHeaders: Headers,
  traceparent: string,
  traceId: string,
  spanId: string,
): ReturnType<typeof fetch> => {
  const headers = await prepareHeaders(incomingHeaders, traceparent, traceId, spanId);

  return await fetch(url, { method: 'GET', headers });
};

interface TraceParent {
  traceparent: string;
  traceId: string;
  spanId: string;
}

export const getTraceparent = (incomingHeaders: Headers): TraceParent => {
  const traceparent = incomingHeaders.get('traceparent');

  return traceparent === null ? generateTraceParent() : parseTraceParent(traceparent);
};

const TRACE_VERSION = '00';
const TRACE_FLAGS = '00';

/** Generates a traceparent ID according to https://www.w3.org/TR/trace-context/#version-format */
export const generateTraceParent = (): TraceParent => {
  const traceId = getUuid();
  const spanId = getUuid().substring(0, 16); // parent_id

  return {
    traceparent: `${TRACE_VERSION}-${traceId}-${spanId}-${TRACE_FLAGS}`,
    traceId,
    spanId,
  };
};

const getUuid = () => crypto.randomUUID().replaceAll('-', '');

const parseTraceParent = (traceparent: string): TraceParent => {
  const [_, traceId, spanId, __] = traceparent.split('-');

  return { traceparent, traceId, spanId };
};
