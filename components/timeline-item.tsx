import { DateTime } from '@/components/datetime';
import { EVENT_DESCRIPTIONS, EVENT_ICONS, EVENT_NAMES, type SakEvent } from '@/lib/api';
import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

export const TimelineItem = ({ type, date }: SakEvent) => {
  const Icon = EVENT_ICONS[type];
  const description = EVENT_DESCRIPTIONS[type];

  return (
    <HStack as="li" gap="2" wrap={false} align="stretch">
      <div className="after:-translate-x-1/2 after:-z-10 relative bottom-0 z-0 after:absolute after:top-0 after:left-1/2 after:h-full after:w-05 after:bg-bg-subtle after:content-['']">
        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-subtle *:h-6 *:w-fit">
          <Icon aria-hidden />
        </div>
      </div>

      <VStack gap="2" flexGrow="1">
        <Heading level="2" size="xsmall">
          {EVENT_NAMES[type]}
        </Heading>

        <DateTime date={date} />

        <BodyShort size="small">{description}</BodyShort>
      </VStack>
    </HStack>
  );
};
