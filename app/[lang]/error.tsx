'use client'; // Error boundaries must be Client Components
import { DEFAULT_LANGUAGE, Languages, isLanguage } from '@/locales';
import { BodyShort, Button, Heading, Page } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import { useEffect } from 'react';

// biome-ignore lint/suspicious/noShadowRestrictedNames: Next.js convention
export default function Error({
  error,
  // reset,
}: {
  error: Error & { digest?: string };
  // reset: () => void;
}) {
  const lang = getLanguage(window.location.pathname);

  useEffect(() => console.error(error), [error]);

  return (
    <Page contentBlockPadding="end">
      <PageBlock as="main" width="xl" gutters>
        <Heading size="medium">{WRONG[lang]}</Heading>
        {error.message && <BodyShort>{error.message}</BodyShort>}

        <div className="mt-4 flex gap-2">
          <Button variant="primary" onClick={() => window.history.back()}>
            {GO_BACK[lang]}
          </Button>
          <Button variant="secondary" onClick={() => window.location.reload()}>
            {REFRESH[lang]}
          </Button>
        </div>
      </PageBlock>
    </Page>
  );
}

const getLanguage = (pathname: string) => {
  const [lang] = pathname.split('/').filter(Boolean);

  return isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
};

const WRONG: Record<Languages, string> = {
  [Languages.NB]: 'Noe gikk galt',
  [Languages.NN]: 'Noko gjekk gale',
  [Languages.EN]: 'Something went wrong',
};

const GO_BACK: Record<Languages, string> = {
  [Languages.NB]: 'Gå tilbake',
  [Languages.NN]: 'Gå tilbake',
  [Languages.EN]: 'Go back',
};

const REFRESH: Record<Languages, string> = {
  [Languages.NB]: 'Oppdater',
  [Languages.NN]: 'Oppdater',
  [Languages.EN]: 'Refresh',
};
