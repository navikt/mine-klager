'use client';

import { BodyLong, Button, Dialog, Link } from '@navikt/ds-react';
import { ButtonLink } from '@/components/button-link';
import { getNavUrl } from '@/lib/get-nav-url';
import type { MetricsContextData } from '@/lib/metrics';
import { Language, type Translation } from '@/locales';

interface InnsendingsytelseDialogProps {
  triggerText: string;
  options: { id: string; navn: string; href: string }[];
  eventName: string;
  context: MetricsContextData;
  lang: Language;
  title: string;
}

export const InnsendingsytelseDialog = ({
  triggerText,
  options,
  eventName,
  context,
  lang,
  title,
}: InnsendingsytelseDialogProps) => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="primary">{triggerText}</Button>
      </Dialog.Trigger>
      <Dialog.Popup width="small">
        <Dialog.Header>
          <Dialog.Title>{title}</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-4">
          {CONTACT[lang]}
          {RIGHTS_AND_PROCESSING_TIMES[lang]}
          {options.map((option) => (
            <ButtonLink
              className="justify-start"
              key={option.href}
              variant="secondary"
              href={option.href}
              openInNewTab
              component="actions"
              eventName={eventName}
              context={{ ...context, ytelse: option.id }}
            >
              {option.navn}
            </ButtonLink>
          ))}
        </Dialog.Body>
      </Dialog.Popup>
    </Dialog>
  );
};

const CONTACT: Translation<React.ReactNode> = {
  [Language.NB]: (
    <BodyLong>
      Har du spørsmål om et vedtak fra Nav, kan du{' '}
      <Link inlineText href={getNavUrl('kontaktoss', Language.NB)}>
        kontakte oss
      </Link>
      .
    </BodyLong>
  ),
  [Language.NN]: (
    <BodyLong>
      Har du spørsmål om eit vedtak frå Nav, kan du{' '}
      <Link inlineText href={getNavUrl('kontaktoss', Language.NB)}>
        kontakte oss
      </Link>
      .
    </BodyLong>
  ),
  [Language.EN]: (
    <BodyLong>
      If you have questions about a decision from Nav, you can{' '}
      <Link inlineText href={getNavUrl('kontaktoss', Language.EN)}>
        contact us
      </Link>
      .
    </BodyLong>
  ),
};

const RIGHTS_AND_PROCESSING_TIMES: Translation<React.ReactNode> = {
  [Language.NB]: (
    <BodyLong>
      Les mer om{' '}
      <Link inlineText href={getNavUrl('klagerettigheter', Language.NB)}>
        klagerettighetene
      </Link>{' '}
      dine og se{' '}
      <Link inlineText href={getNavUrl('saksbehandlingstider', Language.NB)}>
        saksbehandlingstider
      </Link>
      .
    </BodyLong>
  ),
  [Language.NN]: (
    <BodyLong>
      Les meir om{' '}
      <Link inlineText href={getNavUrl('klagerettigheter', Language.NN)}>
        klagerettane
      </Link>{' '}
      dine og sjå{' '}
      <Link inlineText href={getNavUrl('saksbehandlingstider', Language.NN)}>
        saksbehandlingstider
      </Link>
      .
    </BodyLong>
  ),
  [Language.EN]: (
    <BodyLong>
      Read more about your{' '}
      <Link inlineText href={getNavUrl('klagerettigheter', Language.EN)}>
        right to appeal
      </Link>{' '}
      and see{' '}
      <Link inlineText href={getNavUrl('saksbehandlingstider', Language.EN)}>
        processing times
      </Link>
      .
    </BodyLong>
  ),
};
