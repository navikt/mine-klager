'use client'; // Error boundaries must be Client Components
import { DEFAULT_LANGUAGE, Languages, type Translation, isLanguage } from '@/locales';
import { Alert, Button, HStack, Heading, Page } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import { useEffect } from 'react';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const lang = getLanguage(window.location.pathname);

  useEffect(() => console.error(error), [error]);

  return (
    <Page contentBlockPadding="end">
      <PageBlock as="main" width="xl" gutters>
        <Heading size="medium" spacing>
          {WRONG[lang]}
        </Heading>

        {error.message.length === 0 ? null : (
          <Alert variant="error" size="small">
            {error.message}
          </Alert>
        )}

        <HStack gap="2" marginBlock="2 0">
          <Button variant="primary" onClick={() => window.history.back()}>
            {GO_BACK[lang]}
          </Button>
          <Button variant="secondary" onClick={() => reset()}>
            {REFRESH[lang]}
          </Button>
        </HStack>
      </PageBlock>
    </Page>
  );
}

const getLanguage = (pathname: string) => {
  const [lang] = pathname.split('/').filter((s) => s.length > 0);

  return isLanguage(lang) ? lang : DEFAULT_LANGUAGE;
};

const WRONG: Translation = {
  [Languages.NB]: 'Noe gikk galt',
  [Languages.NN]: 'Noko gjekk gale',
  [Languages.EN]: 'Something went wrong',
};

const GO_BACK: Translation = {
  [Languages.NB]: 'Gå tilbake',
  [Languages.NN]: 'Gå tilbake',
  [Languages.EN]: 'Go back',
};

const REFRESH: Translation = {
  [Languages.NB]: 'Oppdater',
  [Languages.NN]: 'Oppdater',
  [Languages.EN]: 'Refresh',
};
