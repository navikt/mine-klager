import { DateTime } from '@/components/datetime';
import { EventActions } from '@/components/event-actions';
import { EventDescription } from '@/components/event-description';
import { EventHeading } from '@/components/event-heading';
import { EventIcon } from '@/components/event-icon';
import type { Sak, SakEvent } from '@/lib/api';
import type { Languages } from '@/locales';
import { CalendarIcon, ChevronRightIcon } from '@navikt/aksel-icons';
import { Box, HStack, Tag, VStack } from '@navikt/ds-react';

interface TimelineItemProps {
  sakEvent: SakEvent;
  sak: Sak;
  lang: Languages;
}

export const TimelineItem = ({ sakEvent, sak, lang }: TimelineItemProps) => {
  const { type, date } = sakEvent;

  return (
    <Box
      as="li"
      borderRadius="medium"
      paddingBlock="4"
      paddingInline="2"
      flexGrow="1"
      className="group relative flex flex-row flex-nowrap transition-colors duration-200 hover:bg-surface-hover"
    >
      <EventIcon type={type} />

      <VStack flexGrow="1" marginInline="2 0" className="z-10">
        <HStack gap="2" wrap={false} align="start" justify="space-between" flexShrink="0">
          <EventHeading type={type} lang={lang} />

          <Tag size="small" variant="neutral-moderate" icon={<CalendarIcon aria-hidden />}>
            <DateTime date={date} />
          </Tag>
        </HStack>

        <VStack gap="4" flexGrow="1">
          <EventDescription type={type} lang={lang} marginRight />

          <HStack gap="2" align="center" justify="end" flexShrink="0" className="flex-row-reverse">
            <EventActions sak={sak} eventType={sakEvent.type} lang={lang} />
          </HStack>
        </VStack>
      </VStack>

      <ChevronRightIcon className="-ml-8 z-0 h-full w-8 shrink-0 grow-0 self-center" aria-hidden />
    </Box>
  );
};
