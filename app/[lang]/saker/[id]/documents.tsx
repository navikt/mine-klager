'use client';
import { Languages } from '@/locales';
import { ExpansionCard } from '@navikt/ds-react';

interface DocumentsProps {
  lang: Languages;
}

export const Documents = ({ lang }: DocumentsProps) => {
  const documents: unknown[] = [];

  const heading = `${HEADING[lang]} (${documents.length})`;

  return (
    <ExpansionCard aria-label={heading} size="small" className="w-full">
      <ExpansionCard.Header>
        <ExpansionCard.Title>{heading}</ExpansionCard.Title>

        <ExpansionCard.Description>Dokumenter knyttet til saken.</ExpansionCard.Description>
      </ExpansionCard.Header>

      <ExpansionCard.Content>Dokumenter</ExpansionCard.Content>
    </ExpansionCard>
  );
};

const HEADING: Record<Languages, string> = {
  [Languages.NB]: 'Sakens dokumenter',
  [Languages.NN]: 'Sakens dokument',
  [Languages.EN]: 'Case documents',
};
