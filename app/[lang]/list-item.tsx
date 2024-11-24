import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { EventType, type Sak, SaksType } from '@/lib/api';
import { getYtelseName } from '@/lib/kodeverk';
import { DEFAULT_LANGUAGE, type Languages } from '@/locales';
import { ArrowsCirclepathIcon, FileExportIcon, ParagraphIcon } from '@navikt/aksel-icons';
import { Box, HStack, Heading, VStack } from '@navikt/ds-react';
import NextLink from 'next/link';

interface SakListItemProps {
  sak: Sak;
  lang: Languages;
}

export const SakListItem = ({ sak, lang }: SakListItemProps) => {
  const { id, typeId, saksnummer, events } = sak;
  const lastEvent = events.at(-1);
  const mottattEvent =
    events.find((event) => event.type === EventType.MOTTATT_VEDTAKSINSTANS) ??
    events.find((event) => event.type === EventType.MOTTATT_KA);

  const Icon = getIcon(typeId);

  const pathPrefix = lang === DEFAULT_LANGUAGE ? '' : `/${lang}`;

  return (
    <li className="group duration-200 ease-in-out hover:bg-surface-hover">
      <NextLink href={`${pathPrefix}/saker/${id}`} className="block text-text-default no-underline">
        <Box as="section" shadow="small" padding="8" borderRadius="medium">
          <HStack gap="2" align="center">
            <Icon aria-hidden className="h-16 w-fit text-text-subtle group-hover:text-text-action-hover" />

            <VStack>
              <Heading
                level="2"
                size="medium"
                spacing
                className="underline group-hover:text-text-action-hover group-hover:no-underline"
              >
                <Title {...sak} />
              </Heading>

              <VStack gap="2">
                <InfoItem label="Saksnummer">{saksnummer}</InfoItem>
                <InfoItem label="Mottatt">
                  {mottattEvent === undefined ? 'Ukjent dato' : <DateTime id="mottatt" date={mottattEvent.date} />}
                </InfoItem>
                <InfoItem label="Siste hendelse">
                  {lastEvent === undefined ? (
                    'Ingen hendelser'
                  ) : (
                    <HStack gap="1">
                      <DateTime id="last-event" date={lastEvent.date} /> - <span>{getEventName(lastEvent.type)}</span>
                    </HStack>
                  )}
                </InfoItem>
              </VStack>
            </VStack>
          </HStack>
        </Box>
      </NextLink>
    </li>
  );
};

const getIcon = (typeId: SaksType) => {
  switch (typeId) {
    case SaksType.KLAGE:
      return FileExportIcon;
    case SaksType.ANKE:
      return ParagraphIcon;
    case SaksType.ANKE_I_TRYGDERETTEN:
      return FileExportIcon;
    case SaksType.BEHANDLING_ETTER_TRYGDERETTEN_OPPHEVET:
      return FileExportIcon;
    case SaksType.OMGJOERINGSKRAV:
      return ArrowsCirclepathIcon;
  }
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

const getEventName = (type: string) => {
  switch (type) {
    case EventType.MOTTATT_VEDTAKSINSTANS:
      return 'Mottatt vedtaksinstans';
    case EventType.MOTTATT_KA:
      return 'Mottatt klageinstans';
    case EventType.FERDIG_KA:
      return 'Ferdig klageinstans';
    case EventType.SENDT_TR:
      return 'Sendt Trygderetten';
  }
};
