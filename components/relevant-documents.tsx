import { PdfLink } from '@/components/pdf-link';
import { type EventDocument, EventDocumentType } from '@/lib/types';
import { Language, type Translation } from '@/locales';
import { HStack } from '@navikt/ds-react';
import type React from 'react';

interface RelevantDocumentsProps {
  relevantDocuments: EventDocument[];
  lang: Language;
}

export const RelevantDocuments = ({ relevantDocuments, lang }: RelevantDocumentsProps) => {
  const links: React.ReactNode[] = [];

  for (const d of relevantDocuments) {
    if (d.journalpostId === null) {
      continue;
    }

    if (d.eventDocumentType === EventDocumentType.SVARBREV) {
      links.push(
        <PdfLink key={d.journalpostId} journalpostId={d.journalpostId} tooltip={d.title}>
          {SVARBREV[lang]}
        </PdfLink>,
      );
    }
  }

  if (links.length === 0) {
    return null;
  }

  return (
    <HStack gap="2" align="start" justify="end">
      {links}
    </HStack>
  );
};

const SVARBREV: Translation = {
  [Language.NB]: 'Åpne svarbrev',
  [Language.NN]: 'Åpne svarbrev',
  [Language.EN]: 'Open reply letter',
};
