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
      borderRadius="4"
      padding="space-8"
      flexGrow="1"
      className="relative flex flex-row flex-nowrap transition-colors duration-200"
    >
      <EventIcon type={type} />
      <VStack flexGrow="1" marginInline="space-8 space-0" gap="space-8">
        <Stack
          gap="space-8"
          align="start"
          justify="space-between"
          wrap={false}
          direction={{ xs: 'column', sm: 'column', md: 'row' }}
        >
          <EventHeading type={type} lang={lang} />

          <Tag data-color="neutral" variant="moderate" icon={<CalendarIcon aria-hidden />} size="small">
            <DateTime date={date} lang={lang} />
          </Tag>
        </Stack>

        <VStack gap="space-16" flexGrow="1">
          <EventDescription type={type} lang={lang} />

          {children}
        </VStack>
      </VStack>
    </Box>
  );
};
