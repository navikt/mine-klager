import { DateTime } from '@/components/datetime';
import { TimelineItem } from '@/components/timeline-item';
import type { Sak } from '@/lib/api';
import type { Languages } from '@/locales';
import { BodyShort, Box, HGrid, Heading, Tag } from '@navikt/ds-react';

interface AllEventsProps {
  sak: Sak;
  lang: Languages;
}

export const AllEvents = ({ sak, lang }: AllEventsProps) => {
  const { events } = sak;
  const lastEvent = events.at(-1);
  const firstEvent = events.at(0);

  return (
    <Box as="section">
      <Heading level="2" size="medium" spacing>
        {HEADING[lang]} ({events.length})
      </Heading>

      {firstEvent === undefined ? null : (
        <BodyShort size="medium" color="text-subtle" spacing>
          <span>{FROM[lang]} </span>

          <Tag size="small" variant="neutral-moderate">
            <DateTime date={firstEvent.date} />
          </Tag>

          <span> {TO[lang]} </span>

          <Tag size="small" variant="neutral-moderate">
            <DateTime date={(lastEvent ?? firstEvent).date} />
          </Tag>
        </BodyShort>
      )}

      <HGrid as="ul" gap="0" marginBlock="4 0" columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 2, '2xl': 2 }}>
        {events.map((event) => (
          <TimelineItem key={`${event.type}-${event.date}`} sakEvent={event} sak={sak} lang={lang} />
        ))}
      </HGrid>
    </Box>
  );
};

const HEADING: Record<Languages, string> = {
  nb: 'Alle hendelser',
  nn: 'Alle hendingar',
  en: 'All events',
};

const FROM: Record<Languages, string> = {
  nb: 'Fra',
  nn: 'Frå',
  en: 'From',
};

const TO: Record<Languages, string> = {
  nb: 'til',
  nn: 'til',
  en: 'to',
};
