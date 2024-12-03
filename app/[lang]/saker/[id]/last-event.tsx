import { DateTime } from '@/components/datetime';
import { EventActions } from '@/components/event-actions';
import { EventDescription } from '@/components/event-description';
import { EventHeading } from '@/components/event-heading';
import type { Sak, SakEvent } from '@/lib/api';
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
    <Box as="section" width="fit-content">
      <Heading level="2" size="medium" spacing>
        {LAST_EVENT_LABEL[lang]}
      </Heading>

      <Box
        borderRadius="medium"
        padding="4"
        background="surface-subtle"
        className="transition-colors duration-200 hover:bg-surface-hover"
      >
        <HStack gap="8" align="start" justify="space-between" wrap={false}>
          <EventHeading type={type} lang={lang} />

          <Tag size="small" variant="info-moderate" icon={<CalendarIcon aria-hidden />}>
            <DateTime date={date} />
          </Tag>
        </HStack>

        <VStack gap="4" flexGrow="1">
          <EventDescription type={type} lang={lang} />

          <HStack gap="2" align="center" justify="start">
            <EventActions sak={sak} eventType={type} lang={lang} />
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
