'use client';

import { Tooltip } from '@navikt/ds-react';
import { ButtonLink } from '@/components/button-link';
import type { MetricsContextData } from '@/lib/metrics';

interface PdfLinkProps {
  journalpostId: string;
  tooltip: string;
  children: React.ReactNode;
  component: string;
  context: MetricsContextData;
}

export const PdfLink = ({ journalpostId, tooltip, children, component, context }: PdfLinkProps) => (
  <Tooltip content={tooltip} placement="top" maxChar={Number.POSITIVE_INFINITY} describesChild>
    <ButtonLink
      variant="primary"
      href={`/pdf/${journalpostId}`}
      openInNewTab
      eventName="open-pdf"
      component={component}
      context={context}
    >
      {children}
    </ButtonLink>
  </Tooltip>
);
