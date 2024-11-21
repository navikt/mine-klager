import { type DecoratorLocale, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';
import '@/app/globals.css';
import { LANGUAGES } from '@/locales';
import { Page, PageBlock } from '@navikt/ds-react/Page';

export const metadata: Metadata = {
  title: 'Mine klager',
  description: 'Oversikt over dine klager og anker',
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: DecoratorLocale }>;
}

const availableLanguages = LANGUAGES.map((locale) => ({
  locale,
  handleInApp: false,
  url: `/${locale}`,
}));

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const { lang } = await params;

  const Decorator = await fetchDecoratorReact({
    env: 'dev',
    params: { language: lang, availableLanguages, logoutWarning: true },
  });

  return (
    <html lang={lang}>
      <head>
        <Decorator.HeadAssets />
      </head>
      <body>
        <Decorator.Header />

        <Page contentBlockPadding="end" className="pt-7">
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
