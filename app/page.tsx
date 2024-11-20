import { EventType, type Sak, SaksType, getSaker } from '@/lib/api';
import { getYtelseName } from '@/lib/kodeverk';
import { BodyShort, Box, HStack, Heading, Label, Link, Tag, VStack } from '@navikt/ds-react';
import { } from '@navikt/ds-react/Page';
import NextLink from 'next/link';

export default async function Home() {
  const { active, finished } = await getSaker();

  console.log({ active, finished });

  return (
    <VStack gap="8">
      <Heading level="1" size="large" spacing>
        Mine klager og anker
      </Heading>

      <Heading level="2" size="medium" spacing>
        Aktive saker ({active.length})
      </Heading>

      <VStack as="ul" gap="4">
        {active.map(SakListItem)}
      </VStack>

      <Heading level="2" size="medium" spacing>
        Ferdige saker ({finished.length})
      </Heading>

      <VStack as="ul" gap="4">
        {finished.map(SakListItem)}
      </VStack>
    </VStack>
  );
}

const SakListItem = (sak: Sak) => {
  const { id, saksnummer, events } = sak;
  const lastEvent = events.at(-1);
  const mottattEvent =
    events.find((event) => event.type === EventType.MOTTATT_VEDTAKSINSTANS) ??
    events.find((event) => event.type === EventType.MOTTATT_KA);

  return (
    <li key={id}>
      <NextLink href={`/saker/${id}`} >
        <Box shadow="small" minHeight="200px" padding="8" borderRadius="medium" color='var(--a-text-default)'>
          <VStack>
            <Heading level="2" size="medium" spacing>
              <Title {...sak} />
            </Heading>
            <HStack gap="1" marginBlock="0 2">
              <Label htmlFor="saksnummer">Saksnummer:</Label>
              <span id="saksnummer">{saksnummer}</span>
            </HStack>
            <HStack gap="1" marginBlock="0 2">
              <Label htmlFor="mottatt">Mottatt:</Label>
              <span id="mottatt">{mottattEvent?.date}</span>
            </HStack>
            <HStack gap="1" marginBlock="0 2">
              <Label htmlFor="mottatt">Sist hendelse:</Label>
              <span id="mottatt">{lastEvent?.date} - {lastEvent?.type}</span>
            </HStack>
          </VStack>
        </Box>
      </NextLink>
    </li>
  );
};

const TYPE_NAMES: Record<SaksType, string> = {
  [SaksType.KLAGE]: 'Klage',
  [SaksType.ANKE]: 'Anke',
  [SaksType.ANKE_I_TRYGDERETTEN]: 'Anke i Trygderetten',
  [SaksType.BEHANDLING_ETTER_TRYGDERETTEN_OPPHEVET]: 'Behandling etter Trygderetten opphevet',
  [SaksType.OMGJOERINGSKRAV]: 'Omgjøringskrav',
};

const Title = async ({ typeId, ytelseId }: Sak) => {
  const ytelseName = await getYtelseName(ytelseId);

  switch (typeId) {
    case SaksType.KLAGE:
      return `Klage på ${ytelseName}`;
    case SaksType.ANKE:
      return `Anke på ${ytelseName}`;
    case SaksType.ANKE_I_TRYGDERETTEN:
      return `Anke i Trygderetten for ${ytelseName}`;
    case SaksType.BEHANDLING_ETTER_TRYGDERETTEN_OPPHEVET:
      return `Anke på ${ytelseName}`;
    case SaksType.OMGJOERINGSKRAV:
      return `Omgjøringskrav for ${ytelseName}`;
  }
};

interface TypeProps {
  type: SaksType;
}

const Type = ({ type }: TypeProps) => (
  <Tag variant="info" size="small">
    {TYPE_NAMES[type]}
  </Tag>
);
