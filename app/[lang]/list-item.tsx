import { CaseIcon } from '@/app/[lang]/case-icon';
import { Received } from '@/app/[lang]/received';
import { DateTime } from '@/components/datetime';
import { InfoItem } from '@/components/info-item';
import { EVENT_NAMES } from '@/lib/event-names';
import { getSakHeading } from '@/lib/sak-heading';
import type { Sak } from '@/lib/types';
import { DEFAULT_LANGUAGE, Languages, type Translation } from '@/locales';
import { Box, HStack, Heading, Stack, VStack } from '@navikt/ds-react';
import NextLink from 'next/link';

interface SakListItemProps {
  sak: Sak;
  lang: Languages;
}

export const SakListItem = ({ sak, lang }: SakListItemProps) => {
  const { id, typeId, saksnummer, events, innsendingsytelseId } = sak;

  const heading = getSakHeading(typeId, innsendingsytelseId, lang);
  const lastEvent = events.at(-1);

  const pathPrefix = lang === DEFAULT_LANGUAGE ? '' : `/${lang}`;

  return (
    <li className="group duration-200 ease-in-out hover:bg-surface-hover">
      <NextLink href={`${pathPrefix}/saker/${id}`} className="block text-text-default no-underline">
        <Box as="section" shadow="small" padding={{ xs: '4', sm: '4', md: '6' }} borderRadius="medium">
          <Stack
            gap={{ xs: '4', sm: '4', md: '6' }}
            direction={{ xs: 'column', sm: 'row' }}
            align="center"
            wrap={false}
          >
            <CaseIcon
              typeId={typeId}
              className="h-8 w-fit shrink-0 text-text-subtle group-hover:text-text-action-hover md:h-12"
            />

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
                <InfoItem label={CASE_NUMBER[lang]}>{saksnummer}</InfoItem>

                <Received sak={sak} lang={lang} />

                <InfoItem label={LAST_EVENT[lang]}>
                  {lastEvent === undefined ? (
                    NO_EVENTS[lang]
                  ) : (
                    <HStack gap="1">
                      <DateTime id="last-event" date={lastEvent.date} lang={lang} /> -{' '}
                      <span>{EVENT_NAMES[lastEvent.type][lang]}</span>
                    </HStack>
                  )}
                </InfoItem>
              </VStack>
            </VStack>
          </Stack>
        </Box>
      </NextLink>
    </li>
  );
};

const CASE_NUMBER: Translation = {
  [Languages.NB]: 'Saksnummer',
  [Languages.NN]: 'Saksnummer',
  [Languages.EN]: 'Case number',
};

const LAST_EVENT: Translation = {
  [Languages.NB]: 'Siste hendelse',
  [Languages.NN]: 'Siste hending',
  [Languages.EN]: 'Last event',
};

const NO_EVENTS: Translation = {
  [Languages.NB]: 'Ingen hendelser',
  [Languages.NN]: 'Ingen hendingar',
  [Languages.EN]: 'No events',
};
