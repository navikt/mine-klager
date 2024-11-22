import { DEFAULT_LANGUAGE } from '@/locales';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  rewrites: async () => ({
    beforeFiles: [
      {
        source: '/',
        destination: `/${DEFAULT_LANGUAGE}`,
        locale: false,
      },
      {
        source: '/saker/:id',
        destination: `/${DEFAULT_LANGUAGE}/saker/:id`,
        locale: false,
      },
    ],
    afterFiles: [],
    fallback: [],
  }),
};

export default nextConfig;
