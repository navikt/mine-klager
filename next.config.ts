import { DEFAULT_LANGUAGE, LANGUAGES } from '@/locales';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  i18n: {
    locales: LANGUAGES,
    defaultLocale: DEFAULT_LANGUAGE,
    localeDetection: false,
  },
  // biome-ignore lint/suspicious/useAwait: Must return promise
  redirects: async () => [
    {
      source: '/',
      destination: `/${DEFAULT_LANGUAGE}`,
      permanent: true,
    },
  ],
};

export default nextConfig;
