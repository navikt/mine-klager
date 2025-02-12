import { getOboToken } from '@/lib/get-obo-token';
import { Audience } from '@/lib/types';

export const getFromKabal = async (
  url: string,
  incomingHeaders: Headers,
  traceparent?: string,
): ReturnType<typeof fetch> => {
  const token = await getOboToken(Audience.KABAL_API, incomingHeaders);

  const headers: HeadersInit = { method: 'GET', Authorization: `Bearer ${token}` };

  if (traceparent !== undefined) {
    headers.traceparent = traceparent;
  }

  return await fetch(url, { headers });
};

interface TraceParent {
  traceparent: string;
  trace_id: string;
  span_id: string;
}

export const getTraceparent = (incomingHeaders: Headers): TraceParent => {
  const traceparent = incomingHeaders.get('traceparent');

  return traceparent === null ? generateTraceParent() : parseTraceParent(traceparent);
};

const TRACE_VERSION = '00';
const TRACE_FLAGS = '00';

/** Generates a traceparent ID according to https://www.w3.org/TR/trace-context/#version-format */
export const generateTraceParent = (): TraceParent => {
  const trace_id = getUUID();
  const span_id = getUUID().substring(0, 16); // parent_id

  return {
    traceparent: `${TRACE_VERSION}-${trace_id}-${span_id}-${TRACE_FLAGS}`,
    trace_id,
    span_id,
  };
};

const getUUID = () => crypto.randomUUID().replaceAll('-', '');

const parseTraceParent = (traceparent: string): TraceParent => {
  const [_, trace_id, span_id, __] = traceparent.split('-');

  return { traceparent, trace_id, span_id };
};
