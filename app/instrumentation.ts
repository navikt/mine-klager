import { initialize } from '@/lib/observability';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    initialize();
    await require('pino');
    await require('next-logger');
  }
}
