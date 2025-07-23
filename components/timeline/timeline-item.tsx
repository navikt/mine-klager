import { CalendarIcon } from '@navikt/aksel-icons';
import { Box, Stack, Tag, VStack } from '@navikt/ds-react';
import { DateTime } from '@/components/datetime';
import { EventDescription } from '@/components/timeline/event-description';
import { EventHeading } from '@/components/timeline/event-heading';
import { EventIcon } from '@/components/timeline/event-icon';
import type { SakEvent } from '@/lib/types';
import type { Language } from '@/locales';

interface TimelineItemContentProps {
  sakEvent: SakEvent;
  lang: Language;
  as: 'li' | 'section';
  children?: React.ReactNode;
}

export const TimelineItem = ({ sakEvent, lang, as, children }: TimelineItemContentProps) => {
  const { type, date } = sakEvent;

  return (
    <Box
      as={as}
      borderRadius="medium"
      padding="2"
      flexGrow="1"
      className="relative flex flex-row flex-nowrap transition-colors duration-200 hover:bg-surface-hover"
    >
      <EventIcon type={type} />

      <VStack flexGrow="1" marginInline="2 0" gap="2">
        <Stack
          gap="2"
          align="start"
          justify="space-between"
          wrap={false}
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
        >
          <EventHeading type={type} lang={lang} />

          <Tag variant="neutral-moderate" icon={<CalendarIcon aria-hidden />} size="small">
            <DateTime date={date} lang={lang} />
          </Tag>
        </Stack>

        <VStack gap="4" flexGrow="1">
          <EventDescription type={type} lang={lang} />

          {children}
        </VStack>
      </VStack>
    </Box>
  );
};
