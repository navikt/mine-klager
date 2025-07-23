import { VERSION } from '@/lib/version';

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

type LoggerFn = (message: string, traceId: string, spanId: string, eventData?: Record<string, string | number>) => void;

export const getLogger = (module: string) => ({
  debug: getLogLine(LogLevel.DEBUG, module),
  info: getLogLine(LogLevel.INFO, module),
  warn: getLogLine(LogLevel.WARN, module),
  error: getLogLine(LogLevel.ERROR, module),
});

type GetLogLineFn = (level: LogLevel, module: string) => LoggerFn;

const getLogLine: GetLogLineFn = (level, module) => (message, traceId, spanId, eventData) =>
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

const timestamp = () => new Date().toISOString();
