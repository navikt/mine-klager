import { getOboToken } from '@/lib/get-obo-token';
import { Audience } from '@/lib/types';
import { logger } from '@navikt/next-logger';

export const getFromKabal = async (url: string, incomingHeaders: Headers): ReturnType<typeof fetch> => {
  const token = await getOboToken(Audience.KABAL_API, incomingHeaders);
  const traceparent = incomingHeaders.get('traceparent') ?? generateTraceParent();

  const res = await fetch(url, { headers: { Authorization: `Bearer ${token}`, traceparent }, method: 'GET' });

  logger.debug({ msg: url, status: res.status, traceparent });

  return res;
};

export const fetchWithTraceparent = async (
  url: string,
  headers: HeadersInit,
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH',
  body?: BodyInit | null,
): ReturnType<typeof fetch> => {
  const traceparent = generateTraceParent();

  const res = await fetch(url, { headers: { ...headers, traceparent }, body, method });

  logger.debug({ msg: url, status: res.status, traceparent });

  return res;
};

const getUUID = () => crypto.randomUUID().replaceAll('-', '');

const TRACE_VERSION = '00';
const TRACE_FLAGS = '00';

/** Generates a traceparent ID according to https://www.w3.org/TR/trace-context/#version-format */
export const generateTraceParent = (): string => {
  const traceId = getUUID();
  const parentId = getUUID().substring(0, 16);

  return `${TRACE_VERSION}-${traceId}-${parentId}-${TRACE_FLAGS}`;
};
