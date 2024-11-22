import { SakListItem } from '@/app/[lang]/list-item';
import { getSaker } from '@/lib/api';
import type { Languages } from '@/locales';
import { Heading, VStack } from '@navikt/ds-react';

interface FinishedListProps {
  lang: Languages;
}

export const FinishedList = async ({ lang }: FinishedListProps) => {
  const { finished } = await getSaker();

  return (
    <section>
      <Heading level="2" size="medium" spacing>
        Ferdige saker ({finished.length})
      </Heading>

      <VStack as="ul" gap="4">
        {finished.map((sak, index) => (
          <SakListItem key={`${sak.id}-${index}`} sak={sak} lang={lang} />
        ))}
      </VStack>
    </section>
  );
};

export default FinishedList;
