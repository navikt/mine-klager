import { SakListItem } from '@/app/[lang]/list-item';
import { getSaker } from '@/lib/api';
import type { Languages } from '@/locales';
import { Heading, VStack } from '@navikt/ds-react';

interface ActiveListProps {
  lang: Languages;
}

export const ActiveList = async ({ lang }: ActiveListProps) => {
  const { saker } = await getSaker();

  return (
    <section>
      <Heading level="2" size="medium" spacing>
        Aktive saker ({saker.length})
      </Heading>

      <VStack as="ul" gap="4">
        {saker.map((sak, index) => (
          <SakListItem key={`${sak.id}-${index}`} sak={sak} lang={lang} />
        ))}
      </VStack>
    </section>
  );
};

export default ActiveList;
