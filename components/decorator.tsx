import { context, ROOT_CONTEXT } from '@opentelemetry/api';
import Script from 'next/script';
import '@/app/globals.css';
import { Page, PageBlock } from '@navikt/ds-react/Page';
import { type DecoratorParams, fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import { TITLE } from '@/app/[lang]/title';
import { Faro } from '@/components/faro';
import { isDeployedToProd } from '@/lib/environment';
import { DEFAULT_LANGUAGE, LANGUAGES, type Language } from '@/locales';

const env = isDeployedToProd ? 'prod' : 'dev';
const availableLanguages: DecoratorParams['availableLanguages'] = LANGUAGES.map((locale) => ({
  locale,
  handleInApp: true,
}));

const cache = new Map<Language, ReturnType<typeof fetchDecoratorReact>>();

const getDecorator = (language: Language) => {
  const cached = cache.get(language);

  if (cached !== undefined) {
    return cached;
  }

  const promise = context.with(ROOT_CONTEXT, () =>
    fetchDecoratorReact({
      env,
      params: {
        language,
        availableLanguages,
        logoutWarning: true,
        breadcrumbs: [{ title: TITLE[language], url: language === DEFAULT_LANGUAGE ? '/' : `/${language}/` }],
      },
    }),
  );

  cache.set(language, promise);

  return promise;
};

interface Props {
  children: React.ReactNode;
  lang: Language;
}

export const Decorator = async ({ children, lang }: Readonly<Props>) => {
  const Decorator = await getDecorator(lang);

  return (
    <html lang={lang} data-environment={process.env.NAIS_CLUSTER_NAME} data-version={process.env.VERSION}>
      <Faro />

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
