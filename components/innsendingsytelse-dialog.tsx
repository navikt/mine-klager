'use client';

import { BodyLong, Button, Dialog, Link } from '@navikt/ds-react';
import { ButtonLink } from '@/components/button-link';
import { getNavUrl } from '@/lib/get-nav-url';
import type { MetricsContextData } from '@/lib/metrics';
import type { Language } from '@/locales';

interface InnsendingsytelseDialogProps {
  triggerText: string;
  options: { navn: string; href: string }[];
  eventName: string;
  context: MetricsContextData;
  lang: Language;
}

export const InnsendingsytelseDialog = ({
  triggerText,
  options,
  eventName,
  context,
  lang,
}: InnsendingsytelseDialogProps) => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="primary">{triggerText}</Button>
      </Dialog.Trigger>
      <Dialog.Popup width="small">
        <Dialog.Header>
          <Dialog.Title>Velg hva du vil klage/anke på</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body className="flex flex-col gap-4">
          <BodyLong>
            Har du spørsmål om et vedtak fra Nav, kan du{' '}
            <Link href={`${getNavUrl(lang)}/kontaktoss`}>kontakte oss</Link>.
          </BodyLong>
          <BodyLong>
            Les mer om <Link href={`${getNavUrl(lang)}/klagerettigheter`}>klagerettighetene</Link> dine og se{' '}
            <Link href={`${getNavUrl(lang)}/saksbehandlingstider`}>saksbehandlingstider</Link>.
          </BodyLong>
          {options.map((option) => (
            <ButtonLink
              className="justify-start"
              key={option.href}
              variant="secondary"
              href={option.href}
              openInNewTab
              component="actions"
              eventName={eventName}
              context={context}
            >
              {option.navn}
            </ButtonLink>
          ))}
        </Dialog.Body>
      </Dialog.Popup>
    </Dialog>
  );
};
