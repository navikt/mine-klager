import { logger } from '@navikt/next-logger';
import { VERSION } from '@/lib/version';

// Undefined values are omitted from the log line by pino.
type LoggerFn = (message: string, eventData?: Record<string, string | number | undefined>) => void;

interface Logger {
  debug: LoggerFn;
  info: LoggerFn;
  warn: LoggerFn;
  error: LoggerFn;
}

/**
 * Logs single line JSON through pino. `trace_id` and `span_id` are added by `@navikt/next-logger`.
 */
export const getLogger = (module: string): Logger => {
  const child = logger.child({ module, version: VERSION });

  return {
    debug: (message, eventData) => child.debug(eventData ?? {}, message),
    info: (message, eventData) => child.info(eventData ?? {}, message),
    warn: (message, eventData) => child.warn(eventData ?? {}, message),
    error: (message, eventData) => child.error(eventData ?? {}, message),
  };
};
