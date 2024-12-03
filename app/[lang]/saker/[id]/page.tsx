import { AllEvents } from '@/app/[lang]/saker/[id]/all-events';
import { LastEvent } from '@/app/[lang]/saker/[id]/last-event';
import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { getSak } from '@/lib/api';
import { getSakHeading } from '@/lib/sak-heading';
import { DEFAULT_LANGUAGE, Languages, isLanguage } from '@/locales';
import { Heading, VStack } from '@navikt/ds-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string; lang: Languages }>;
}

export async function generateMetadata({ params }: Props) {
  const { lang, id } = await params;
  const sak = await getSak(id);

  if (sak === undefined || !isLanguage(lang)) {
    return {
      title: FALLBACK_TITLE[lang],
      lang,
    };
  }

  const { ytelseId, saksnummer } = sak;
  const heading = await getSakHeading(ytelseId, lang);

  return {
    title: `${heading} - ${saksnummer}`,
    lang,
  };
}

export default async function SakPage({ params }: Props) {
  const { lang, id } = await params;
  const sak = await getSak(id);

  if (sak === undefined || !isLanguage(lang)) {
    return notFound();
  }

  const { saksnummer, events, ytelseId } = sak;
  const heading = await getSakHeading(ytelseId, lang);

  const path = `/saker/${id}`;

  const lastEvent = events.at(-1);

  return (
    <>
      <DecoratorUpdater
        lang={lang}
        path={path}
        breadcrumbs={[
          {
            title: heading,
            url: lang === DEFAULT_LANGUAGE ? path : `/${lang}/saker/${id}`,
          },
        ]}
      />

      <Heading level="1" size="large" spacing>
        {heading}
      </Heading>

      <VStack gap="4">
        <CopyItem label={CASE_NUMBER_LABEL[lang]}>{saksnummer}</CopyItem>

        <LastEvent sak={sak} lastEvent={lastEvent} lang={lang} />

        <AllEvents sak={sak} lang={lang} />
      </VStack>
    </>
  );
}

const CASE_NUMBER_LABEL: Record<Languages, string> = {
  [Languages.NB]: 'Saksnummer',
  [Languages.NN]: 'Saksnummer',
  [Languages.EN]: 'Case number',
};

const FALLBACK_TITLE: Record<Languages, string> = {
  [Languages.NB]: 'Klage',
  [Languages.NN]: 'Klage',
  [Languages.EN]: 'Complaint',
};
