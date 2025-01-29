import Script from 'next/script';
import '@/app/globals.css';
import { TITLE } from '@/app/[lang]/title';
import { isDeployedToProd } from '@/lib/environment';
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@/locales';
import { Page, PageBlock } from '@navikt/ds-react/Page';
import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';

interface Props {
  children: React.ReactNode;
  lang: Language;
}

export const Decorator = async ({ children, lang }: Readonly<Props>) => {
  const Decorator = await fetchDecoratorReact({
    env: isDeployedToProd ? 'prod' : 'dev',
    params: {
      language: lang,
      availableLanguages: LANGUAGES.map((locale) => ({ locale, handleInApp: true })),
      logoutWarning: true,
      breadcrumbs: [{ title: TITLE[lang], url: lang === DEFAULT_LANGUAGE ? '/' : `/${lang}/` }],
    },
  });

  return (
    <html lang={lang}>
      {/* biome-ignore lint/nursery/noHeadElement: head is needed here */}
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
