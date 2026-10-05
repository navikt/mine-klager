import { logger } from '@navikt/next-logger';
import { VERSION } from '@/lib/version';

// Undefined values are omitted from the log line by pino.
type EventData = Record<string, string | number | undefined>;

// `error` is logged as `err` by pino's error serializer, including `cause`. Grafana shows it as `err_message`, `err_stack` and `err_type`.
type LoggerFn = (message: string, eventData?: EventData, error?: unknown) => void;

interface Logger {
  debug: LoggerFn;
  info: LoggerFn;
  warn: LoggerFn;
  error: LoggerFn;
}

/**
 * Logs single line JSON through pino. `trace_id` and `span_id` are added by `@navikt/pino-logger`, which `@navikt/next-logger` uses.
 */
export const getLogger = (module: string): Logger => {
  const child = logger.child({ module, version: VERSION });

  return {
    debug: (message, eventData, error) => child.debug(withError(eventData, error), message),
    info: (message, eventData, error) => child.info(withError(eventData, error), message),
    warn: (message, eventData, error) => child.warn(withError(eventData, error), message),
    error: (message, eventData, error) => child.error(withError(eventData, error), message),
  };
};

const withError = (eventData: EventData = {}, error?: unknown) => ({ ...eventData, err: error });
