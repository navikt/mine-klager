import type { Instrumentation } from 'next';
import { getLogger } from '@/lib/logger';

const logger = getLogger('request-error');

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('pino');
    await import('./instrumentation.node');
  }
}

/**
 * Logs uncaught server errors, which Next otherwise only logs as unstructured text.
 * Next does not call this for `notFound()` and `redirect()`.
 * The digest is shown to the user in `error.tsx`.
 */
export const onRequestError: Instrumentation.onRequestError = (error, request, context) => {
  logger.error('Unhandled server error', {
    error: error instanceof Error ? error.message : 'Unknown error',
    stack: error instanceof Error ? error.stack : undefined,
    digest: getDigest(error),
    path: request.path,
    method: request.method,
    routePath: context.routePath,
    routeType: context.routeType,
    renderSource: context.renderSource,
  });
};

const getDigest = (error: unknown): string | undefined =>
  error instanceof Error && 'digest' in error && typeof error.digest === 'string' ? error.digest : undefined;
