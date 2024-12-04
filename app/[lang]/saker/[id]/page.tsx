import { AllEvents } from '@/app/[lang]/saker/[id]/all-events';
import { Documents } from '@/app/[lang]/saker/[id]/documents';
import { LastEvent } from '@/app/[lang]/saker/[id]/last-event';
import { NextEvent } from '@/app/[lang]/saker/[id]/next-event';
import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { InfoItem } from '@/components/info-item';
import { EventType, getSak } from '@/lib/api';
import { PRETTY_DATE_FORMAT, format } from '@/lib/date';
import { getYtelseName } from '@/lib/kodeverk';
import { getSakHeading } from '@/lib/sak-heading';
import { DEFAULT_LANGUAGE, Languages, isLanguage } from '@/locales';
import { HGrid, HStack, Heading } from '@navikt/ds-react';
import { addWeeks, parseISO } from 'date-fns';
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
  const ytelseName = await getYtelseName(ytelseId, lang);

  return {
    title: `${saksnummer} - ${ytelseName}`,
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
  const previousEvents = events.slice(0, -1);

  const fromDateString = events.findLast(
    (e) => e.type === EventType.KLAGE_MOTTATT_KLAGEINSTANS || EventType.ANKE_MOTTATT_KLAGEINSTANS,
  )?.date;

  const fromDate = fromDateString === undefined ? undefined : parseISO(fromDateString);
  const from = fromDate === undefined ? null : ` ${FROM[lang]} ${format(fromDate, PRETTY_DATE_FORMAT, lang)}`;
  const expectedDeadline =
    fromDate === undefined ? null : ` (${format(addWeeks(fromDate, 12), PRETTY_DATE_FORMAT, lang)})`;

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

      <HStack gap="2">
        <CopyItem label={CASE_NUMBER_LABEL[lang]}>{saksnummer}</CopyItem>

        <InfoItem label={DEADLINE_LABEL[lang]}>
          {WEEKS[lang](12)}
          {from}
          {expectedDeadline}
        </InfoItem>
      </HStack>

      <HGrid gap="8 4" marginBlock="8 0" columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2, '2xl': 2 }}>
        <LastEvent lastEvent={lastEvent} sak={sak} lang={lang} />

        <NextEvent lastEvent={lastEvent} lang={lang} />

        <AllEvents sak={sak} previousEvents={previousEvents} lang={lang} />

        <Documents lang={lang} />
      </HGrid>
    </>
  );
}

const CASE_NUMBER_LABEL: Record<Languages, string> = {
  [Languages.NB]: 'Saksnummer',
  [Languages.NN]: 'Saksnummer',
  [Languages.EN]: 'Case number',
};

const DEADLINE_LABEL: Record<Languages, string> = {
  [Languages.NB]: 'Varslet frist',
  [Languages.NN]: 'Varsla frist',
  [Languages.EN]: 'Deadline',
};

const WEEKS: Record<Languages, (n: number) => string> = {
  [Languages.NB]: (n) => (n === 1 ? `${n.toString(10)} uke` : `${n.toString(10)} uker`),
  [Languages.NN]: (n) => (n === 1 ? `${n.toString(10)} veke` : `${n.toString(10)} veker`),
  [Languages.EN]: (n) => (n === 1 ? `${n.toString(10)} week` : `${n.toString(10)} weeks`),
};

const _MONTHS: Record<Languages, (n: number) => string> = {
  [Languages.NB]: (n) => (n === 1 ? `${n.toString(10)} måned` : `${n.toString(10)} måneder`),
  [Languages.NN]: (n) => (n === 1 ? `${n.toString(10)} månad` : `${n.toString(10)} månadar`),
  [Languages.EN]: (n) => (n === 1 ? `${n.toString(10)} month` : `${n.toString(10)} months`),
};

const FROM: Record<Languages, string> = {
  [Languages.NB]: 'fra',
  [Languages.NN]: 'frå',
  [Languages.EN]: 'from',
};

const FALLBACK_TITLE: Record<Languages, string> = {
  [Languages.NB]: 'Klage',
  [Languages.NN]: 'Klage',
  [Languages.EN]: 'Complaint',
};
