'use client';

import { ButtonLink } from '@/components/button-link';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { Tooltip } from '@navikt/ds-react';

interface PdfLinkProps {
  journalpostId: string;
  tooltip: string;
  children: React.ReactNode;
  component: string;
  context: AmplitudeContextData;
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
