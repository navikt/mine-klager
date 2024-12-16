import { Decorator } from '@/components/decorator';
import { Languages as Language } from '@/locales';
import { Alert, Button } from '@navikt/ds-react';

// TODO: Language support
export default function Unauthorized() {
  return (
    <Decorator lang={Language.NB}>
      <Alert variant="error">
        <div className="flex items-center gap-4">
          {LOGGED_OUT[Language.NB]} / {LOGGED_OUT[Language.EN]}
          <Button variant="primary" as="a" href="/oauth2/login">
            {LOG_IN[Language.NB]} / {LOG_IN[Language.EN]}
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
