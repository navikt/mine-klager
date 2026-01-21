'use client';

import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Alert, Box, Button, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';
import { RelevantDocuments } from '@/components/relevant-documents';
import { TimelineItem } from '@/components/timeline/timeline-item';
import { type MetricsContextData, sendMetricEvent } from '@/lib/metrics';
import type { Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface EventListProps {
  sak: Sak;
  lang: Language;
  context: MetricsContextData;
}

export const EventList = ({ sak, lang, context }: EventListProps) => {
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
      <Box borderWidth="1" borderRadius="8" padding="space-16" height="fit-content">
        <VStack gap="space-12">
          <TimelineItem as="section" sakEvent={lastEvent} lang={lang} />

          {hasPreviousEvents ? (
            <Button
              variant={expanded ? 'tertiary-neutral' : 'tertiary'}
              onClick={() => {
                setExpanded(!expanded);
                const eventName = expanded ? 'collapse-previous-events' : 'expand-previous-events';
                const count = previousEvents.length;
                const lastEventType = lastEvent.type;
                sendMetricEvent(eventName, 'event-list', { ...context, count: count.toString(10), lastEventType });
              }}
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
            <VStack as="ul" gap="space-8" width="fit-content" className="flex-col-reverse">
              {previousEvents.map((event) => (
                <TimelineItem as="li" key={`${event.type}-${event.date}`} sakEvent={event} lang={lang}>
                  <RelevantDocuments
                    relevantDocuments={event.relevantDocuments}
                    lang={lang}
                    component="previous-event"
                    context={context}
                  />
                </TimelineItem>
              ))}
            </VStack>
          ) : null}
        </VStack>
      </Box>
    </section>
  );
};

const HEADING: Translation = {
  [Language.NB]: 'Hendelser',
  [Language.NN]: 'Hendingar',
  [Language.EN]: 'Events',
};

const SHOW_ALL: Translation = {
  [Language.NB]: 'Vis eldre hendelser',
  [Language.NN]: 'Vis eldre hendingar',
  [Language.EN]: 'Show older events',
};

const COLLAPSE: Translation = {
  [Language.NB]: 'Skjul eldre hendelser',
  [Language.NN]: 'Skjul eldre hendingar',
  [Language.EN]: 'Hide older events',
};

const NO_PREVIOUS_EVENTS: Translation = {
  [Language.NB]: 'Ingen tidligere hendelser',
  [Language.NN]: 'Ingen tidlegare hendingar',
  [Language.EN]: 'No previous events',
};
