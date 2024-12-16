import { DateTime } from '@/components/datetime';
import { LastEventActions } from '@/components/event-actions';
import { EventDescription } from '@/components/event-description';
import { EventHeading } from '@/components/event-heading';
import type { Sak, SakEvent } from '@/lib/types';
import { Languages } from '@/locales';
import { CalendarIcon } from '@navikt/aksel-icons';
import { Box, HStack, Heading, Tag, VStack } from '@navikt/ds-react';

interface LastEventProps {
  sak: Sak;
  lastEvent: SakEvent | undefined;
  lang: Languages;
}

export const LastEvent = ({ sak, lastEvent, lang }: LastEventProps) => {
  if (lastEvent === undefined) {
    return null;
  }

  const { type, date } = lastEvent;

  return (
    <Box as="section">
      <Heading level="2" size="medium" spacing>
        {LAST_EVENT_LABEL[lang]}
      </Heading>

      <Box
        borderRadius="medium"
        padding="4"
        background="surface-subtle"
        width="fit-content"
        minWidth={{ xs: '100%', md: '75%', lg: '60%', xl: '100%' }}
        flexGrow="1"
        className="transition-colors duration-200 hover:bg-surface-hover"
      >
        <HStack gap="2" align="start" justify="space-between" wrap={false}>
          <EventHeading type={type} lang={lang} />

          <Tag variant="alt3-moderate" icon={<CalendarIcon aria-hidden />}>
            <DateTime date={date} lang={lang} />
          </Tag>
        </HStack>

        <VStack gap="4" flexGrow="1">
          <EventDescription type={type} lang={lang} />

          <HStack gap="2" align="center" justify="end" className="flex-row-reverse">
            <LastEventActions sak={sak} event={lastEvent} lang={lang} />
          </HStack>
        </VStack>
      </Box>
    </Box>
  );
};

const LAST_EVENT_LABEL: Record<Languages, string> = {
  [Languages.NB]: 'Siste hendelse',
  [Languages.NN]: 'Siste hending',
  [Languages.EN]: 'Last event',
};
