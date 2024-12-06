import { type DecoratorLocale, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import Script from 'next/script';
import '@/app/globals.css';
import { TITLE } from '@/app/[lang]/title';
import { isDeployedToProd } from '@/lib/environment';
import { getLanguage } from '@/lib/get-language';
import { DEFAULT_LANGUAGE, LANGUAGES } from '@/locales';
import { Page, PageBlock } from '@navikt/ds-react/Page';

interface Props {
  children: React.ReactNode;
  params: Promise<{ lang: DecoratorLocale }>;
}

const RootLayout = async ({ children, params }: Readonly<Props>) => {
  const lang = await getLanguage(params);

  const Decorator = await fetchDecoratorReact({
    env: isDeployedToProd ? 'prod' : 'dev',
    params: {
      language: lang,
      availableLanguages: LANGUAGES.map((locale) => ({
        locale,
        handleInApp: true,
      })),
      logoutWarning: true,
      breadcrumbs: [
        {
          title: TITLE[lang],
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

        <Page contentBlockPadding="end">
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
