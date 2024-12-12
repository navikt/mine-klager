import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { EVENT_NAMES } from '@/lib/event-names';
import { getSakHeading } from '@/lib/sak-heading';
import { EventType } from '@/lib/types';
import type { Sak, SakEvent } from '@/lib/types';
import { DEFAULT_LANGUAGE, type Languages } from '@/locales';
import { ParagraphIcon } from '@navikt/aksel-icons';
import { Box, HStack, Heading, VStack } from '@navikt/ds-react';
import NextLink from 'next/link';

interface SakListItemProps {
  sak: Sak;
  lang: Languages;
}

export const SakListItem = ({ sak, lang }: SakListItemProps) => {
  const { id, saksnummer, events, ytelseId } = sak;

  const heading = getSakHeading(ytelseId, lang);
  const lastEvent = events.at(-1);

  const pathPrefix = lang === DEFAULT_LANGUAGE ? '' : `/${lang}`;

  return (
    <li className="group duration-200 ease-in-out hover:bg-surface-hover">
      <NextLink href={`${pathPrefix}/saker/${id}`} className="block text-text-default no-underline">
        <Box as="section" shadow="small" padding="8" borderRadius="medium">
          <HStack gap="2" align="center">
            <ParagraphIcon aria-hidden className="h-16 w-fit text-text-subtle group-hover:text-text-action-hover" />

            <VStack>
              <Heading
                level="2"
                size="medium"
                spacing
                className="underline group-hover:text-text-action-hover group-hover:no-underline"
              >
                {heading}
              </Heading>

              <VStack gap="2">
                <InfoItem label="Saksnummer">{saksnummer}</InfoItem>
                <Mottatt events={events} lang={lang} />
                <InfoItem label="Siste hendelse">
                  {lastEvent === undefined ? (
                    'Ingen hendelser'
                  ) : (
                    <HStack gap="1">
                      <DateTime id="last-event" date={lastEvent.date} lang={lang} /> -{' '}
                      <span>{EVENT_NAMES[lastEvent.type][lang]}</span>
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

const Mottatt = ({ events, lang }: { events: SakEvent[]; lang: Languages }) => {
  const mottattVedtaksinstans = events.find((event) => event.type === EventType.KLAGE_MOTTATT_VEDTAKSINSTANS);
  const mottattKlageinstans = events.find((event) => event.type === EventType.KLAGE_MOTTATT_KLAGEINSTANS);

  if (mottattVedtaksinstans !== undefined) {
    return (
      <InfoItem label="Mottatt vedtaksinstans">
        <DateTime id="mottatt-vedtaksinstans" date={mottattVedtaksinstans.date} lang={lang} />
      </InfoItem>
    );
  }

  if (mottattKlageinstans !== undefined) {
    return (
      <InfoItem label="Mottatt klageinstans">
        <DateTime id="mottatt-klageinstans" date={mottattKlageinstans.date} lang={lang} />
      </InfoItem>
    );
  }

  return <InfoItem label="Mottatt">Ukjent dato</InfoItem>;
};
