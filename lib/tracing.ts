import { type Span, SpanStatusCode } from '@opentelemetry/api';

export const recordSpanError = (span: Span, error: unknown): void => {
  const err = error instanceof Error ? error : new Error('Unknown error');
  span.setStatus({ code: SpanStatusCode.ERROR, message: err.message });
  span.recordException(err);
};
