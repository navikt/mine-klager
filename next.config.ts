import { DEFAULT_LANGUAGE } from '@/locales';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  experimental: {
    optimizePackageImports: ['@navikt/ds-react', '@navikt/aksel-icons'],
  },
  rewrites: async () => ({
    beforeFiles: [],
    afterFiles: [],
    fallback: [
      {
        source: '/saker/:id',
        destination: `/${DEFAULT_LANGUAGE}/saker/:id`,
        locale: false,
      },
      {
        source: '/',
        destination: `/${DEFAULT_LANGUAGE}/`,
        locale: false,
      },
    ],
  }),
};

export default nextConfig;
