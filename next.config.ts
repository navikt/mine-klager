import type { NextConfig } from 'next';
import type { Redirect, Rewrite } from 'next/dist/lib/load-custom-routes';
import { DECORATOR_LANGUAGE_COOKIE } from '@/lib/server/custom-headers';
import { DEFAULT_LANGUAGE, NON_DEFAULT_LANGUAGES } from '@/locales';

const INDEX_PATH = '/';
const PATHS: string[] = ['/saker/:id', INDEX_PATH];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    // Nais runs with a read-only root filesystem, so `.next/cache` is not writable. Keep the cache in memory only.
    isrFlushToDisk: false,
  },
  // `next-logger` is preloaded with `--require` (see `Dockerfile`), so it must be copied to the standalone output.
  // `next-logger.config.js` is loaded at runtime and requires `@navikt/next-logger`. If bundled, it is not copied to the standalone output.
  serverExternalPackages: ['pino', 'pino-pretty', 'thread-stream', 'next-logger', '@navikt/next-logger'],
  // `next-logger` loads `next-logger.config.js` at runtime, so it must be included in the standalone output.
  outputFileTracingIncludes: {
    '/*': ['./next-logger.config.js'],
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.nav.no/klage/mine-klager' : undefined,
  output: 'standalone',
  poweredByHeader: false,
  redirects: async () =>
    // Redirect all non-default languages to path with language prefix.
    PATHS.flatMap<Redirect>((path) =>
      NON_DEFAULT_LANGUAGES.map<Redirect>((lang) => ({
        source: path,
        destination: `/${lang}${path === INDEX_PATH ? '' : path}`,
        permanent: false,
        has: [
          {
            type: 'cookie',
            key: DECORATOR_LANGUAGE_COOKIE,
            value: lang,
          },
        ],
      })),
    ),
  rewrites: async () => ({
    beforeFiles: [],
    // Default no language prefix to default language prefix.
    afterFiles: PATHS.map<Rewrite>((path) => ({
      source: path,
      destination: `/${DEFAULT_LANGUAGE}${path}`,
      locale: false,
    })),
    fallback: [],
  }),
};

export default nextConfig;
