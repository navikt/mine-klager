import { Decorator } from '@/components/decorator';
import { MetricEvent } from '@/components/metrics';
import { getCurrentPath } from '@/lib/server/current-path';
import { getLanguageFromHeaders } from '@/lib/server/get-language';
import { Language } from '@/locales';
import { Alert, Button } from '@navikt/ds-react';
import { headers } from 'next/headers';

export default async function Unauthorized() {
  const lang = getLanguageFromHeaders(await headers());
  const path = await getCurrentPath();

  return (
    <Decorator lang={lang}>
      <MetricEvent eventName="unauthorized" domain="unauthorized" context={{ path, lang, page: 'unauthorized' }} />

      <Alert variant="error">
        <div className="flex items-center gap-4">
          {LOGGED_OUT[lang]}
          <Button variant="primary" as="a" href="/oauth2/login">
            {LOG_IN[lang]}
          </Button>
        </div>
      </Alert>
    </Decorator>
  );
}

const LOGGED_OUT: Record<Language, string> = {
  [Language.NB]: 'Du ser ut til å være logget ut',
  [Language.NN]: 'Du ser ut til å vere logga ut',
  [Language.EN]: 'You seem to be logged out',
};

const LOG_IN: Record<Language, string> = {
  [Language.NB]: 'Logg inn',
  [Language.NN]: 'Logg inn',
  [Language.EN]: 'Log in',
};
