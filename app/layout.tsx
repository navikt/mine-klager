import { fetchDecoratorReact } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { Metadata } from 'next';
import Script from 'next/script';
import './globals.css';
import { Page, PageBlock } from '@navikt/ds-react/Page';

export const metadata: Metadata = {
  title: 'Mine klager',
  description: 'Oversikt over dine klager og anker',
};

interface Props {
  children: React.ReactNode;
}

const RootLayout = async ({ children }: Readonly<Props>) => {
  const Decorator = await fetchDecoratorReact({
    env: 'prod',
  });

  return (
    <html lang="no">
      <head>
        <Decorator.HeadAssets />
      </head>
      <body>
        <Decorator.Header />
        <Page footer={<footer>Footer</footer>} contentBlockPadding="end">
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
