import type { EventType } from '@/lib/api';
import { EVENT_NAMES } from '@/lib/event-names';
import type { Languages } from '@/locales';
import { Heading } from '@navikt/ds-react';

interface EventHeadingProps {
  type: EventType;
  lang: Languages;
}

export const EventHeading = ({ type, lang }: EventHeadingProps) => (
  <Heading level="3" size="small" spacing>
    {EVENT_NAMES[type][lang]}
  </Heading>
);
