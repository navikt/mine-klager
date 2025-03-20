import { VERSION } from '@/lib/version';

enum LogLevel {
  DEBUG = 'debug',
  INFO = 'info',
  WARN = 'warn',
  ERROR = 'error',
}

type LoggerFn = (
  message: string,
  trace_id: string,
  span_id: string,
  eventData?: Record<string, string | number>,
) => void;

export const getLogger = (module: string) => ({
  debug: getLogLine(LogLevel.DEBUG, module),
  info: getLogLine(LogLevel.INFO, module),
  warn: getLogLine(LogLevel.WARN, module),
  error: getLogLine(LogLevel.ERROR, module),
});

type GetLogLineFn = (level: LogLevel, module: string) => LoggerFn;

const getLogLine: GetLogLineFn = (level, module) => (message, trace_id, span_id, eventData) =>
  console[level](
    JSON.stringify({ ...eventData, level, module, message, trace_id, span_id, VERSION, '@timestamp': timestamp() }),
  );

const timestamp = () => new Date().toISOString();
