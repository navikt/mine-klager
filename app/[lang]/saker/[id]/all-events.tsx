'use client';
import { DateTime } from '@/components/datetime';
import { TimelineItem } from '@/components/timeline-item';
import type { Sak, SakEvent } from '@/lib/api';
import { Languages } from '@/locales';
import { BodyShort, ExpansionCard, Tag, VStack } from '@navikt/ds-react';

interface AllEventsProps {
  sak: Sak;
  previousEvents: SakEvent[];
  lang: Languages;
}

export const AllEvents = ({ sak, previousEvents, lang }: AllEventsProps) => {
  const heading = `${HEADING[lang]} (${previousEvents.length})`;

  const { events } = sak;
  const lastEvent = events.at(-1);
  const firstEvent = events.at(0);

  return (
    <ExpansionCard aria-label={heading} size="small">
      <ExpansionCard.Header>
        <ExpansionCard.Title>{heading}</ExpansionCard.Title>

        <ExpansionCard.Description>
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
        </ExpansionCard.Description>
      </ExpansionCard.Header>

      <ExpansionCard.Content>
        <VStack as="ul" gap="2" marginBlock="4 0" width="fit-content" className="flex-col-reverse">
          {previousEvents.toReversed().map((event) => (
            <TimelineItem key={`${event.type}-${event.date}`} sakEvent={event} sak={sak} lang={lang} />
          ))}
        </VStack>
      </ExpansionCard.Content>
    </ExpansionCard>
  );
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
