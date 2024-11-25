import { type DecoratorLocale, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';
import '@/app/globals.css';
import { DEFAULT_LANGUAGE, LANGUAGES, isLanguage } from '@/locales';
import { Page, PageBlock } from '@navikt/ds-react/Page';
import { notFound } from 'next/navigation';

export const metadata: Metadata = {
  title: 'Mine klager',
  description: 'Oversikt over dine klager og anker',
};

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: DecoratorLocale }>;
}

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const { lang } = await params;

  if (!isLanguage(lang)) {
    return notFound();
  }

  const Decorator = await fetchDecoratorReact({
    // biome-ignore lint/nursery/noProcessEnv: NextJS does not support import.meta.env
    env: process.env.NODE_ENV === 'development' ? 'dev' : 'prod',
    params: {
      language: lang,
      availableLanguages: LANGUAGES.map((locale) => ({
        locale,
        handleInApp: true,
      })),
      logoutWarning: true,
      breadcrumbs: [
        {
          title: 'Mine klager og anker',
          url: lang === DEFAULT_LANGUAGE ? '/' : `/${lang}/`,
        },
      ],
    },
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
