import { DECORATOR_LANGUAGE_COOKIE } from '@/lib/custom-headers';
import { DEFAULT_LANGUAGE, NON_DEFAULT_LANGUAGES } from '@/locales';
import type { NextConfig } from 'next';
import type { Redirect, Rewrite } from 'next/dist/lib/load-custom-routes';

const INDEX_PATH = '/';
const PATHS: string[] = ['/saker/:id', INDEX_PATH];

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
    authInterrupts: true,
  },
  assetPrefix: process.env.NODE_ENV === 'production' ? 'https://cdn.nav.no/klage/mine-klager' : undefined,
  output: 'standalone',
  poweredByHeader: false,
  // deploymentId: process.env.VERSION ?? 'local',
  // generateBuildId: () => process.env.VERSION ?? 'local',
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
