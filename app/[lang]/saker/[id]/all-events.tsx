'use client';
import { LastEventItem } from '@/components/timeline/last-event';
import { TimelineItem } from '@/components/timeline/timeline-item';
import type { Sak } from '@/lib/types';
import { Languages, type Translation } from '@/locales';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Alert, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';

interface AllEventsProps {
  sak: Sak;
  lang: Languages;
}

export const AllEvents = ({ sak, lang }: AllEventsProps) => {
  const [expanded, setExpanded] = useState(false);

  const { events } = sak;

  const lastEvent = events.at(-1);
  const previousEvents = events.slice(0, -1);

  if (lastEvent === undefined) {
    return null;
  }

  const hasPreviousEvents = previousEvents.length > 0;

  return (
    <section>
      <Heading level="2" size="medium" spacing>
        {HEADING[lang]}
      </Heading>

      <Box borderWidth="1" borderRadius="large" padding="4" height="fit-content">
        <VStack gap="3">
          <LastEventItem sakEvent={lastEvent} sak={sak} lang={lang} />

          {hasPreviousEvents ? (
            <Button
              variant={expanded ? 'tertiary-neutral' : 'tertiary'}
              onClick={() => setExpanded(!expanded)}
              icon={expanded ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
              className="w-full"
            >
              {expanded ? COLLAPSE[lang] : `${SHOW_ALL[lang]} (${previousEvents.length})`}
            </Button>
          ) : (
            <Alert variant="info" size="small">
              {NO_PREVIOUS_EVENTS[lang]}
            </Alert>
          )}

          {hasPreviousEvents && expanded ? (
            <VStack as="ul" gap="2" width="fit-content" className="flex-col-reverse">
              {previousEvents.map((event) => (
                <TimelineItem key={`${event.type}-${event.date}`} sakEvent={event} lang={lang} />
              ))}
            </VStack>
          ) : null}
        </VStack>
      </Box>
    </section>
  );
};

const HEADING: Translation = {
  [Languages.NB]: 'Hendelser',
  [Languages.NN]: 'Hendingar',
  [Languages.EN]: 'Events',
};

const SHOW_ALL: Translation = {
  [Languages.NB]: 'Vis eldre hendelser',
  [Languages.NN]: 'Vis eldre hendingar',
  [Languages.EN]: 'Show older events',
};

const COLLAPSE: Translation = {
  [Languages.NB]: 'Skjul eldre hendelser',
  [Languages.NN]: 'Skjul eldre hendingar',
  [Languages.EN]: 'Hide older events',
};

const NO_PREVIOUS_EVENTS: Translation = {
  [Languages.NB]: 'Ingen tidligere hendelser',
  [Languages.NN]: 'Ingen tidlegare hendingar',
  [Languages.EN]: 'No previous events',
};
