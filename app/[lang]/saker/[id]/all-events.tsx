'use client';
import { TimelineItem } from '@/components/timeline-item';
import type { Sak, SakEvent } from '@/lib/api';
import { Languages } from '@/locales';
import { ChevronDownIcon, ChevronUpIcon } from '@navikt/aksel-icons';
import { Box, Button, Heading, VStack } from '@navikt/ds-react';
import { useState } from 'react';

interface AllEventsProps {
  sak: Sak;
  previousEvents: SakEvent[];
  lang: Languages;
}

export const AllEvents = ({ sak, previousEvents, lang }: AllEventsProps) => {
  const [expanded, setExpanded] = useState(false);

  const { events } = sak;

  const lastEvent = events.at(-1);

  if (lastEvent === undefined) {
    return null;
  }

  const toggleExpanded = () => setExpanded(!expanded);

  return (
    <section>
      <Heading level="2" size="medium" spacing>
        {HEADING[lang]}
      </Heading>

      <Box borderWidth="1" borderRadius="large" padding="4" height="fit-content">
        {/* biome-ignore lint/nursery/noStaticElementInteractions: Expandable */}
        <div
          onClick={toggleExpanded}
          className="cursor-pointer"
          onKeyDown={({ key }) => {
            if (key === 'Enter' || key === ' ') {
              toggleExpanded();
            }

            if (key === 'Escape') {
              setExpanded(false);
            }
          }}
        >
          <TimelineItem sakEvent={lastEvent} sak={sak} lang={lang} />
        </div>

        <Button
          variant={expanded ? 'tertiary-neutral' : 'tertiary'}
          onClick={toggleExpanded}
          icon={expanded ? <ChevronUpIcon aria-hidden /> : <ChevronDownIcon aria-hidden />}
          className="mt-3 w-full"
          title={expanded ? COLLAPSE[lang] : SHOW_ALL[lang]}
        >
          {expanded ? COLLAPSE[lang] : `${SHOW_ALL[lang]} (${previousEvents.length})`}
        </Button>

        {expanded ? (
          <div>
            <VStack as="ul" gap="2" marginBlock="4 0" width="fit-content" className="flex-col-reverse">
              {previousEvents.map((event) => (
                <TimelineItem key={`${event.type}-${event.date}`} sakEvent={event} sak={sak} lang={lang} />
              ))}
            </VStack>
          </div>
        ) : null}
      </Box>
    </section>
  );
};

const HEADING: Record<Languages, string> = {
  [Languages.NB]: 'Hendelser',
  [Languages.NN]: 'Hendingar',
  [Languages.EN]: 'Events',
};

const SHOW_ALL: Record<Languages, string> = {
  [Languages.NB]: 'Vis resterende hendelser',
  [Languages.NN]: 'Vis resterande hendingar',
  [Languages.EN]: 'Show remaining events',
};

const COLLAPSE: Record<Languages, string> = {
  [Languages.NB]: 'Skjul eldre hendelser',
  [Languages.NN]: 'Skjul eldre hendingar',
  [Languages.EN]: 'Hide older events',
};
