import { HStack } from '@navikt/ds-react';
import type React from 'react';
import { PdfLink } from '@/components/pdf-link';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { type EventDocument, EventDocumentType } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface RelevantDocumentsProps {
  relevantDocuments: EventDocument[];
  lang: Language;
  component: string;
  context: AmplitudeContextData;
}

export const RelevantDocuments = ({ relevantDocuments, lang, component, context }: RelevantDocumentsProps) => {
  const links: React.ReactNode[] = [];

  for (const { journalpostId, eventDocumentType, title } of relevantDocuments) {
    if (journalpostId === null) {
      continue;
    }

    if (eventDocumentType === EventDocumentType.SVARBREV) {
      links.push(
        <PdfLink
          key={journalpostId}
          journalpostId={journalpostId}
          tooltip={title}
          component={component}
          context={context}
        >
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
  [Language.NB]: 'Åpne brev',
  [Language.NN]: 'Opne brev',
  [Language.EN]: 'Open letter',
};
