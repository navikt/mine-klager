import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { TimelineItem } from '@/components/timeline-item';
import { getSak } from '@/lib/api';
import { getLanguage } from '@/lib/get-language';
import { getSakTitle } from '@/lib/sak-title';
import { DEFAULT_LANGUAGE, Languages, isLanguage } from '@/locales';
import { HGrid, Heading } from '@navikt/ds-react';
import { notFound } from 'next/navigation';

interface MetadataProps {
  params: Promise<{ lang: Languages }>;
}

const TITLE: Record<Languages, string> = {
  [Languages.NB]: 'Min sak',
  [Languages.NN]: 'Min sak',
  [Languages.EN]: 'My case',
};

export async function generateMetadata({ params }: MetadataProps) {
  const lang = await getLanguage(params);

  return {
    title: TITLE[lang],
    lang,
  };
}

const HEADING: Record<Languages, string> = {
  [Languages.NB]: 'Sak',
  [Languages.NN]: 'Sak',
  [Languages.EN]: 'Case',
};

const CASE_NUMBER_LABEL: Record<Languages, string> = {
  [Languages.NB]: 'Saksnummer',
  [Languages.NN]: 'Saksnummer',
  [Languages.EN]: 'Case number',
};

interface Props {
  params: Promise<{ id: string; lang: Languages }>;
}

export default async function SakPage({ params }: Props) {
  const { lang, id } = await params;
  const sak = await getSak(id);

  if (sak === undefined || !isLanguage(lang)) {
    return notFound();
  }

  const { saksnummer, events, ytelseId } = sak;
  const title = await getSakTitle(ytelseId, lang);

  const path = `/saker/${id}`;

  return (
    <>
      <DecoratorUpdater
        lang={lang}
        path={path}
        breadcrumbs={[
          {
            title,
            url: lang === DEFAULT_LANGUAGE ? path : `/${lang}/saker/${id}`,
          },
        ]}
      />

      <Heading level="1" size="large" spacing>
        {HEADING[lang]}
      </Heading>

      <CopyItem label={CASE_NUMBER_LABEL[lang]}>{saksnummer}</CopyItem>

      <HGrid as="ul" columns={{ xs: 1, sm: 1, md: 2, lg: 2, xl: 3, '2xl': 3 }} gap="4 0" marginBlock="4 0">
        {events.map((event) => (
          <TimelineItem key={`${event.type}-${event.date}`} sakEvent={event} lang={lang} />
        ))}
      </HGrid>
    </>
  );
}
