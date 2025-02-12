'use client';

import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { sendMetricEvent } from '@/lib/metrics';
import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, type ButtonProps } from '@navikt/ds-react';

interface ButtonLinkProps {
  variant: ButtonProps['variant'];
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
  eventName: string;
  component: string;
  context: AmplitudeContextData;
}

export const ButtonLink = ({
  href,
  variant,
  children,
  openInNewTab = false,
  eventName,
  component,
  context,
}: ButtonLinkProps) => (
  <Button
    // biome-ignore lint/a11y/useSemanticElements: Button as link.
    role="link"
    icon={openInNewTab ? <ExternalLinkIcon aria-hidden /> : undefined}
    variant={variant}
    as="a"
    href={href}
    target={openInNewTab ? '_blank' : undefined}
    iconPosition="right"
    onClick={({ button, metaKey }) => {
      if (button !== 0 && button !== 1) {
        return;
      }

      const new_tab = (openInNewTab || metaKey || button === 1).toString();
      sendMetricEvent(eventName, 'button-link', { ...context, component, href, new_tab });
    }}
    onKeyDown={({ key, metaKey }) => {
      if (key === 'Enter') {
        const new_tab = (openInNewTab || metaKey).toString();
        sendMetricEvent(eventName, 'button-link', { ...context, component, href, new_tab });
      }
    }}
  >
    {children}
  </Button>
);
