import { Languages } from '@/locales';
import { Box, Heading } from '@navikt/ds-react';

interface DocumentsProps {
  lang: Languages;
}

export const Documents = ({ lang }: DocumentsProps) => {
  const documents = [];

  return (
    <Box as="section">
      <Heading level="2" size="medium" spacing>
        {HEADING[lang]} ({documents.length})
      </Heading>
    </Box>
  );
};

const HEADING: Record<Languages, string> = {
  [Languages.NB]: 'Sakens dokumenter',
  [Languages.NN]: 'Sak si dokument',
  [Languages.EN]: 'Case documents',
};
