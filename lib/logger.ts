import { trace } from '@opentelemetry/api';
import { VERSION } from '@/lib/version';

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

// Undefined values are omitted from the log line by `JSON.stringify`.
type LoggerFn = (message: string, eventData?: Record<string, string | number | undefined>) => void;

const getTraceContext = () => {
  const span = trace.getActiveSpan();

  if (span === undefined) {
    return { traceId: undefined, spanId: undefined };
  }

  const { traceId, spanId } = span.spanContext();

  return { traceId, spanId };
};

export const getLogger = (module: string) => ({
  debug: getLogLine(LogLevel.DEBUG, module),
  info: getLogLine(LogLevel.INFO, module),
  warn: getLogLine(LogLevel.WARN, module),
  error: getLogLine(LogLevel.ERROR, module),
});

type GetLogLineFn = (level: LogLevel, module: string) => LoggerFn;

const getLogLine: GetLogLineFn = (level, module) => (message, eventData) => {
  const { traceId, spanId } = getTraceContext();

  // biome-ignore lint/suspicious/noConsole: Logging
  console[level](
    JSON.stringify({
      ...eventData,
      level,
      module,
      message,
      // biome-ignore lint/style/useNamingConvention: Logging format
      trace_id: traceId,
      // biome-ignore lint/style/useNamingConvention: Logging format
      span_id: spanId,
      version: VERSION,
      '@timestamp': timestamp(),
    }),
  );
};

const timestamp = () => new Date().toISOString();
