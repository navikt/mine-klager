import { DateTime } from '@/components/datetime';
import { EVENT_DESCRIPTIONS, EVENT_ICONS, EVENT_NAMES, type SakEvent } from '@/lib/api';
import type { Languages } from '@/locales';
import { BodyShort, Box, HStack, Heading, VStack } from '@navikt/ds-react';

interface TimelineItemProps {
  sakEvent: SakEvent;
  lang: Languages;
}

export const TimelineItem = ({ sakEvent, lang }: TimelineItemProps) => {
  const { type, date } = sakEvent;
  const Icon = EVENT_ICONS[type];

  return (
    <HStack asChild gap="2" wrap={false}>
      <Box
        as="li"
        borderRadius="medium"
        paddingBlock="4"
        paddingInline="2"
        className="transition-colors hover:bg-surface-hover"
      >
        <div
          className="after:-translate-x-1/2 after:-z-10 relative bottom-0 z-0 after:absolute after:top-0 after:left-1/2 after:h-full after:w-05 after:bg-bg-subtle after:content-['']"
          role="presentation"
          aria-hidden
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-subtle *:h-6 *:w-fit">
            <Icon aria-hidden />
          </div>
        </div>

        <VStack gap="2" flexGrow="1">
          <Heading level="2" size="xsmall">
            {EVENT_NAMES[type][lang]}
          </Heading>

          <DateTime date={date} />

          <BodyShort size="small">{EVENT_DESCRIPTIONS[type][lang]}</BodyShort>
        </VStack>
      </Box>
    </HStack>
  );
};
