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

// const Icon = styled.div`
//   position: relative;
//   z-index: 0;

//   &::after {
//     content: '';
//     height: 100%;
//     width: var(--a-spacing-05);
//     background-color: var(--a-bg-subtle);
//     position: absolute;
//     top: 0;
//     bottom: 0;
//     left: 50%;
//     transform: translateX(-50%);
//     z-index: -1;
//   }
// `;

// const IconCircle = styled.div`
//   width: var(--a-spacing-10);
//   height: var(--a-spacing-10);
//   border-radius: 50%;
//   background-color: var(--a-bg-subtle);
//   display: flex;
//   justify-content: center;
//   align-items: center;
// `;

// interface DateProps {
//   date: string;
// }

// const DisplayDate = ({ date }: DateProps) => (
//   <time dateTime={date}>{format(parse(date, 'yyyy-MM-dd', new Date()), 'dd.MM.yyyy')}</time>
// );

// const StyledTime = styled.time`
//   font-size: var(--a-font-size-small);
//   color: var(--a-text-subtle);
// `;
