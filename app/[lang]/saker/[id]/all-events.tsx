'use client';
import { DateTime } from '@/components/datetime';
import { TimelineItem } from '@/components/timeline-item';
import type { Sak, SakEvent } from '@/lib/api';
import { Languages } from '@/locales';
import { BodyShort, Box, Button, Heading, Tag, VStack } from '@navikt/ds-react';
import { useState } from 'react';

interface AllEventsProps {
  sak: Sak;
  previousEvents: SakEvent[];
  lang: Languages;
}

export const AllEvents = ({ sak, previousEvents, lang }: AllEventsProps) => {
  const [show, setShow] = useState(false);

  return (
    <Box as="section">
      <Heading level="2" size="medium" spacing>
        {HEADING[lang]} ({previousEvents.length})
      </Heading>

      <Button variant="secondary" onClick={() => setShow((s) => !s)}>
        {show ? CLOSE[lang] : OPEN[lang]}
      </Button>

      {show ? <Content sak={sak} previousEvents={previousEvents} lang={lang} /> : null}
    </Box>
  );
};

interface ContentProps {
  sak: Sak;
  previousEvents: SakEvent[];
  lang: Languages;
}

const Content = ({ sak, previousEvents, lang }: ContentProps) => {
  const { events } = sak;
  const lastEvent = events.at(-1);
  const firstEvent = events.at(0);

  return (
    <>
      {firstEvent === undefined ? null : (
        <BodyShort size="medium" color="text-subtle" spacing>
          <span>{FROM[lang]} </span>

          <Tag variant="neutral-moderate">
            <DateTime date={firstEvent.date} lang={lang} />
          </Tag>

          <span> {TO[lang]} </span>

          <Tag variant="neutral-moderate">
            <DateTime date={(lastEvent ?? firstEvent).date} lang={lang} />
          </Tag>
        </BodyShort>
      )}

      <VStack as="ul" gap="2" marginBlock="4 0" width="fit-content" className="flex-col-reverse">
        {previousEvents.toReversed().map((event) => (
          <TimelineItem key={`${event.type}-${event.date}`} sakEvent={event} sak={sak} lang={lang} />
        ))}
      </VStack>
    </>
  );
};

const OPEN: Record<Languages, string> = {
  [Languages.NB]: 'Se tidligere hendelser',
  [Languages.NN]: 'Sjå tidlegare hendingar',
  [Languages.EN]: 'View previous events',
};

const CLOSE: Record<Languages, string> = {
  [Languages.NB]: 'Skjul tidligere hendelser',
  [Languages.NN]: 'Skjul tidlegare hendingar',
  [Languages.EN]: 'Hide previous events',
};

const HEADING: Record<Languages, string> = {
  [Languages.NB]: 'Tidligere hendelser',
  [Languages.NN]: 'Tidlegare hendingar',
  [Languages.EN]: 'Previous events',
};

const FROM: Record<Languages, string> = {
  [Languages.NB]: 'Fra',
  [Languages.NN]: 'Frå',
  [Languages.EN]: 'From',
};

const TO: Record<Languages, string> = {
  [Languages.NB]: 'til',
  [Languages.NN]: 'til',
  [Languages.EN]: 'to',
};
