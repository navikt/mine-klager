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

/**
 * The library caches the decorator for an hour, invalidates the cache on new decorator versions, and falls back to
 * client-side rendering if the fetch fails. So do not cache the result here, as that would keep a fallback or outdated
 * decorator until restart.
 *
 * Runs in the root context, since the library starts a version polling timer on first use. In the request context,
 * every poll would be traced as part of that request.
 */
const getDecorator = (language: Language) =>
  context.with(ROOT_CONTEXT, () =>
    fetchDecoratorReact({
      env,
      params: {
        language,
        availableLanguages,
        logoutWarning: true,
        breadcrumbs: [
          {
            title: TITLE[language],
            url: language === DEFAULT_LANGUAGE ? '/' : `/${language}/`,
            handleInApp: true,
          },
        ],
      },
    }),
  );

interface Props {
  children: React.ReactNode;
  lang: Language;
}

export const Decorator = async ({ children, lang }: Readonly<Props>) => {
  const Decorator = await getDecorator(lang);

  return (
    <html lang={lang} data-environment={process.env.NAIS_CLUSTER_NAME} data-version={process.env.VERSION}>
      <Faro />

      {/** biome-ignore lint/style/noHeadElement:  App Router requires native <head>, not next/head. next/head breaks the Decorator. */}
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
