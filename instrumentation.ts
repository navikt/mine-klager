export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    await import('pino');
    // Patches `console` to log single line JSON, using `next-logger.config.js`.
    // In production `next-logger` is preloaded with `--require` (see `Dockerfile`), which also patches Next's internal logger. Then this is a no-op.
    // Next logs uncaught request errors itself, with `err.digest` (shown to the user in `error.tsx`) and `trace_id`.
    await import('next-logger');
    await import('./instrumentation.node');
  }
}
