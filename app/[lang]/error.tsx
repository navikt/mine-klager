'use client'; // Error boundaries must be Client Components

import { Alert, Button, Heading, HStack, Page } from '@navikt/ds-react';
import { PageBlock } from '@navikt/ds-react/Page';
import { logger } from '@navikt/next-logger';
import { unauthorized } from 'next/navigation';
import { useEffect } from 'react';
import { UnauthorizedError } from '@/lib/errors';
import { grafana } from '@/lib/observability';
import { DEFAULT_LANGUAGE, isLanguage, Language, type Translation } from '@/locales';

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorPageProps) {
  const lang = getLanguage(window.location.pathname);

  useEffect(() => {
    logger.error(error);
    grafana.pushError(error);
  }, [error]);

  if (error instanceof UnauthorizedError) {
    return unauthorized();
  }

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
  [Language.NB]: 'Noe gikk galt',
  [Language.NN]: 'Noko gjekk gale',
  [Language.EN]: 'Something went wrong',
};

const GO_BACK: Translation = {
  [Language.NB]: 'Gå tilbake',
  [Language.NN]: 'Gå tilbake',
  [Language.EN]: 'Go back',
};

const REFRESH: Translation = {
  [Language.NB]: 'Oppdater',
  [Language.NN]: 'Oppdater',
  [Language.EN]: 'Refresh',
};
