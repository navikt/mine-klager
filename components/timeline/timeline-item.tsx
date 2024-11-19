import { TimelineItemContent } from '@/components/timeline/timeline-item-content';
import type { SakEvent } from '@/lib/types';
import type { Languages } from '@/locales';

interface TimelineItemProps {
  sakEvent: SakEvent;
  lang: Languages;
}

export const TimelineItem = ({ sakEvent, ...rest }: TimelineItemProps) => (
  <TimelineItemContent as="li" {...rest} sakEvent={sakEvent} />
);
