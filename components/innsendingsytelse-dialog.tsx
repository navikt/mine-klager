'use client';

import { Button, Dialog } from '@navikt/ds-react';
import { ButtonLink } from '@/components/button-link';
import type { MetricsContextData } from '@/lib/metrics';

interface InnsendingsytelseDialogProps {
  triggerText: string;
  options: { navn: string; href: string }[];
  eventName: string;
  context: MetricsContextData;
}

export const InnsendingsytelseDialog = ({ triggerText, options, eventName, context }: InnsendingsytelseDialogProps) => {
  return (
    <Dialog>
      <Dialog.Trigger>
        <Button variant="primary">{triggerText}</Button>
      </Dialog.Trigger>
      <Dialog.Popup width="small">
        <Dialog.Header>
          <Dialog.Title>Velg innsendingsytelse</Dialog.Title>
        </Dialog.Header>
        <Dialog.Body>
          <div>
            {options.map((option) => (
              <ButtonLink
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
          </div>
        </Dialog.Body>
      </Dialog.Popup>
    </Dialog>
  );
};
