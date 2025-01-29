'use client';

import { ButtonLink } from '@/components/button-link';
import { Tooltip } from '@navikt/ds-react';

interface PdfLinkProps {
  journalpostId: string;
  tooltip: string;
  children: React.ReactNode;
}

export const PdfLink = ({ journalpostId, tooltip, children }: PdfLinkProps) => (
  <Tooltip content={tooltip}>
    <ButtonLink variant="primary" href={`/pdf/${journalpostId}`} openInNewTab>
      {children}
    </ButtonLink>
  </Tooltip>
);
