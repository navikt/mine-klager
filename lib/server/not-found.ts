import { notFound } from 'next/navigation';
import { cache } from 'react';
import { getLogger } from '@/lib/logger';
import { getCurrentPath } from '@/lib/server/current-path';
import type { LanguageParams } from '@/lib/server/get-language';
import { isLanguage } from '@/locales';

const logger = getLogger('not-found');

/**
 * Logs and renders the nearest `not-found.tsx`.
 * Log here, not in `not-found.tsx`, since Next renders those on every request.
 */
export const pageNotFound = async (): Promise<never> => {
  await logPageNotFound();

  return notFound();
};

/** Renders not found for unsupported language segments, e.g. `/foo` or `/foo/saker/123`. */
export const ensureValidLanguage = async (params: Promise<LanguageParams>): Promise<void> => {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    await pageNotFound();
  }
};

// Cached per request, so calls from both `generateMetadata` and the page only log once.
const logPageNotFound = cache(async () => {
  logger.warn('Page not found', { path: await getCurrentPath() });
});
