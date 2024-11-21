import { DateTime } from '@/components/datetime';
import { BodyShort, HStack, Heading, VStack } from '@navikt/ds-react';

interface TimelineItemProps {
  title: string;
  date: string;
  icon: React.ReactNode;
  text?: string;
  children?: React.ReactNode;
}

export const TimelineItem = ({ title, date, icon, text, children }: TimelineItemProps) => (
  <HStack as="li" gap="2" wrap={false} align="stretch">
    <div className="after:-translate-x-1/2 after:-z-10 relative bottom-0 z-0 after:absolute after:top-0 after:left-1/2 after:h-full after:w-05 after:bg-bg-subtle after:content-['']">
      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-bg-subtle *:h-6 *:w-fit">{icon}</div>
    </div>

    <VStack gap="2" flexGrow="1">
      <Heading level="2" size="xsmall">
        {title}
      </Heading>

      <DateTime date={date} />

      {text === undefined ? null : <BodyShort size="small">{text}</BodyShort>}

      {children === undefined ? null : <HStack gap="2">{children}</HStack>}
    </VStack>
  </HStack>
);
