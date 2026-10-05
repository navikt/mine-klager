// Loaded at runtime by `next-logger` (via lilconfig) to replace `console` and Next's internal logger with pino.
// Must be CommonJS, and must be traced into the standalone output (see `outputFileTracingIncludes` in `next.config.ts`).
const { backendLogger } = require('@navikt/next-logger');

module.exports = {
  logger: backendLogger,
};
