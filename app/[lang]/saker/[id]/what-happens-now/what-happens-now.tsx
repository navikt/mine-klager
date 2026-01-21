import { Box, Heading, VStack } from '@navikt/ds-react';
import { NextDescription } from '@/app/[lang]/saker/[id]/what-happens-now/description';
import { SvarbrevInfo } from '@/app/[lang]/saker/[id]/what-happens-now/svarbrev-info';
import { RelevantDocuments } from '@/components/relevant-documents';
import type { MetricsContextData } from '@/lib/metrics';
import type { SakEvent } from '@/lib/types';
import { EventDocumentType } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface WhatHappensProps {
  lastEvent: SakEvent;
  lang: Language;
  context: MetricsContextData;
}

export const WhatHappensNow = ({ lastEvent, lang, context }: WhatHappensProps) => {
  const { type, relevantDocuments } = lastEvent;

  const svarbrevDate = relevantDocuments.find(
    (doc) => doc.eventDocumentType === EventDocumentType.SVARBREV,
  )?.archiveDate;

  const hasSvarbrev = svarbrevDate !== undefined;

  return (
    <VStack as="section" data-element="next-event">
      <Heading level="2" size="medium" spacing>
        {NEXT_EVENT_LABEL[lang]}
      </Heading>
      <Box
        borderRadius="4"
        padding="space-16"
        background="neutral-soft"
        width="fit-content"
        className="transition-colors duration-200 hover:bg-ax-bg-neutral-moderate-hoverA"
      >
        <VStack gap="space-16">
          <div>
            <NextDescription type={type} lang={lang} hasSvarbrev={hasSvarbrev} />
            {hasSvarbrev ? <SvarbrevInfo date={svarbrevDate} lang={lang} /> : null}
          </div>

          <RelevantDocuments
            relevantDocuments={relevantDocuments}
            lang={lang}
            component="what-happens-now"
            context={context}
          />
        </VStack>
      </Box>
    </VStack>
  );
};

const NEXT_EVENT_LABEL: Translation = {
  [Language.NB]: 'Hva skjer nå?',
  [Language.NN]: 'Kva skjer no?',
  [Language.EN]: 'What happens now?',
};
