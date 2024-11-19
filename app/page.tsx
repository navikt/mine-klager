import { type Sak, SaksType, getSaker } from '@/lib/api';
import { Box, HStack, Heading, Tag, VStack } from '@navikt/ds-react';
import {} from '@navikt/ds-react/Page';
import Link from 'next/link';

export default async function Home() {
  const { active, finished } = await getSaker();

  return (
    <VStack gap="8">
      <Heading level="1" size="large" spacing>
        Mine klager og anker
      </Heading>

      <Heading level="2" size="medium" spacing>
        Aktive saker ({active.length})
      </Heading>

      <HStack as="ul" gap="4">
        {active.map(SakListItem)}
      </HStack>

      <Heading level="2" size="medium" spacing>
        Ferdige saker ({finished.length})
      </Heading>

      <HStack as="ul" gap="4">
        {finished.map(SakListItem)}
      </HStack>
    </VStack>
  );
}

const SakListItem = ({ id, typeId, ytelseId, saksnummer, events }: Sak) => {
  const lastEvent = events.at(-1);

  return (
    <Box as="li" key={id} shadow="small" minHeight="200px" padding="8">
      <Link href={`/saker/${id}`}>
        <Heading level="2" size="medium" spacing>
          <Type type={typeId} /> - {ytelseId}
        </Heading>
        <div>{saksnummer}</div>
        <span>{lastEvent === undefined ? 'Ingen hendelser ennå' : `${lastEvent.date}: ${lastEvent.type}`}</span>
      </Link>
    </Box>
  );
};

const TYPE_NAMES: Record<SaksType, string> = {
  [SaksType.KLAGE]: 'Klage',
  [SaksType.ANKE]: 'Anke',
  [SaksType.ANKE_I_TR]: 'Anke i Trygderetten',
};

interface TypeProps {
  type: SaksType;
}

const Type = ({ type }: TypeProps) => (
  <Tag variant="info" size="small">
    {TYPE_NAMES[type]}
  </Tag>
);
