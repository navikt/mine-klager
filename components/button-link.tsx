'use client';

import { ExternalLinkIcon } from '@navikt/aksel-icons';
import { Button, type ButtonProps } from '@navikt/ds-react';
import { type MetricsContextData, sendMetricEvent } from '@/lib/metrics';

interface ButtonLinkProps {
  variant: ButtonProps['variant'];
  href: string;
  children: React.ReactNode;
  openInNewTab?: boolean;
  eventName: string;
  component: string;
  context: MetricsContextData;
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

      const newTab = (openInNewTab || metaKey || button === 1).toString();
      // biome-ignore lint/style/useNamingConvention: Metric event naming convention
      sendMetricEvent(eventName, 'button-link', { ...context, component, href, new_tab: newTab });
    }}
    onKeyDown={({ key, metaKey }) => {
      if (key === 'Enter') {
        const newTab = (openInNewTab || metaKey).toString();
        // biome-ignore lint/style/useNamingConvention: Metric event naming convention
        sendMetricEvent(eventName, 'button-link', { ...context, component, href, new_tab: newTab });
      }
    }}
  >
    {children}
  </Button>
);
