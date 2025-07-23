import { Heading } from '@navikt/ds-react';
import { EVENT_NAMES } from '@/lib/event-names';
import type { EventType } from '@/lib/types';
import type { Language } from '@/locales';

interface EventHeadingProps {
  type: EventType;
  lang: Language;
}

export const EventHeading = ({ type, lang }: EventHeadingProps) => (
  <Heading level="3" size="small">
    {EVENT_NAMES[type][lang]}
  </Heading>
);
