import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';
import '@/app/globals.css';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/locales';
import { Page, PageBlock } from '@navikt/ds-react/Page';

export const metadata: Metadata = {
  title: 'Mine klager',
  description: 'Oversikt over dine klager og anker',
};

interface Props {
  children: React.ReactNode;
}

const availableLanguages = LANGUAGES.map((locale) => ({
  locale,
  handleInApp: false,
  url: locale === DEFAULT_LANGUAGE ? '/' : `/${locale}`,
}));

const RootLayout = async ({ children }: Readonly<Props>) => {
  const Decorator = await fetchDecoratorReact({
    env: 'prod',
    params: { availableLanguages },
  });

  return (
    <html lang="no">
      <head>
        <Decorator.HeadAssets />
      </head>
      <body>
        <Decorator.Header />

        <Page contentBlockPadding="end" className="pt-8">
          <PageBlock as="main" width="xl" gutters>
            {children}
          </PageBlock>
        </Page>

        <Decorator.Footer />

        <Decorator.Scripts loader={Script} />
      </body>
    </html>
  );
};

export default RootLayout;
