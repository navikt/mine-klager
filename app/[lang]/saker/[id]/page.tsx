import { EventList } from '@/app/[lang]/saker/[id]/event-list';
import { WhatHappensNow } from '@/app/[lang]/saker/[id]/what-happens-now/what-happens-now';
import { Actions } from '@/components/actions/actions';
import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { InfoItem } from '@/components/info-item';
import { MetricEvent } from '@/components/metrics';
import { ReceivedKlageinstans } from '@/components/received-klageinstans';
import { ReceivedVedtaksinstans } from '@/components/received-vedtaksinstans';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { getSak } from '@/lib/api';
import { getCurrentPath } from '@/lib/current-path';
import { ISO_DATE_FORMAT, PRETTY_DATE_FORMAT, format } from '@/lib/date';
import { getYtelseName } from '@/lib/kodeverk';
import { getSakHeading } from '@/lib/sak-heading';
import { BehandlingstidUnitType, CASE_TYPE_NAMES } from '@/lib/types';
import type { Frist, Sak } from '@/lib/types';
import { Language, type Translation, isLanguage } from '@/locales';
import { HGrid, HStack, Heading } from '@navikt/ds-react';
import { parse } from 'date-fns';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

interface Params {
  id: string;
  lang: Language;
  sak: Sak;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props) {
  const { lang, id } = await params;

  const sak = await getSak(await headers(), id);

  if (sak === undefined || !isLanguage(lang)) {
    return { title: FALLBACK_TITLE[lang], lang };
  }

  const { innsendingsytelseId, saksnummer } = sak;

  const ytelseName =
    innsendingsytelseId === null
      ? `${UNKNOWN[lang]} (${innsendingsytelseId})`
      : await getYtelseName(innsendingsytelseId, lang);

  return {
    title: `${saksnummer} - ${ytelseName}`,
    lang,
  };
}

const UNKNOWN: Translation = {
  [Language.NB]: 'Ukjent',
  [Language.NN]: 'Ukjent',
  [Language.EN]: 'Unknown',
};

export default async function SakPage({ params }: Props) {
  const { lang, id } = await params;

  const sak = await getSak(await headers(), id);
  const path = await getCurrentPath();

  if (sak === undefined || !isLanguage(lang)) {
    return notFound();
  }

  const { typeId, saksnummer, events, innsendingsytelseId, varsletBehandlingstid, mottattKlageinstans } = sak;
  const heading = await getSakHeading(typeId, innsendingsytelseId, lang);

  const lastEvent = events.at(-1);
  const hasLastEvent = lastEvent !== undefined;

  const type = CASE_TYPE_NAMES[typeId];
  const ytelse = innsendingsytelseId ?? 'UNKNOWN';
  const eventCount = events.length;

  const context: AmplitudeContextData = { lang, path, page: 'sak', ytelse, type };

  return (
    <>
      <MetricEvent domain="sak" context={context} eventData={{ eventCount, last_event_type: lastEvent?.type }} />

      <DecoratorUpdater
        lang={lang}
        path={`/saker/${id}`}
        breadcrumbs={[
          {
            title: heading,
            url: path,
          },
        ]}
      />

      <Heading level="1" size="large" spacing>
        {heading}
      </Heading>

      <HStack gap="2">
        <CopyItem label={CASE_NUMBER_LABEL[lang]} tooltip={CASE_NUMBER_TOOLTIP[lang]} context={context}>
          {saksnummer}
        </CopyItem>

        <ReceivedVedtaksinstans sak={sak} lang={lang} />

        {varsletBehandlingstid === null ? (
          <ReceivedKlageinstans sak={sak} lang={lang} />
        ) : (
          <InfoItem label={DEADLINE_LABEL[lang]}>
            {formatBehandlingstid(varsletBehandlingstid, mottattKlageinstans, lang)}
          </InfoItem>
        )}
      </HStack>

      {hasLastEvent ? <Actions sak={sak} sakEvent={lastEvent} lang={lang} context={context} /> : null}

      <HGrid gap="8 4" marginBlock="8 0" columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2, '2xl': 2 }}>
        <EventList sak={sak} lang={lang} context={context} />

        {hasLastEvent ? <WhatHappensNow lastEvent={lastEvent} lang={lang} sak={sak} context={context} /> : null}
      </HGrid>
    </>
  );
}

const formatBehandlingstid = (frist: Frist, mottattKlageinstans: string, lang: Language) => {
  const varslet = format(parse(frist.varsletFrist, ISO_DATE_FORMAT, new Date()), PRETTY_DATE_FORMAT, lang);

  if (frist.varsletBehandlingstidUnitTypeId === null) {
    return varslet;
  }

  const unit =
    frist.varsletBehandlingstidUnitTypeId === BehandlingstidUnitType.WEEKS
      ? WEEKS[lang](frist.varsletBehandlingstidUnits)
      : MONTHS[lang](frist.varsletBehandlingstidUnits);

  const from = FROM[lang];

  const mottatt = format(parse(mottattKlageinstans, ISO_DATE_FORMAT, new Date()), PRETTY_DATE_FORMAT, lang);

  return `${unit} ${from} ${mottatt} (${varslet})`;
};

const CASE_NUMBER_LABEL: Translation = {
  [Language.NB]: 'Saksnummer',
  [Language.NN]: 'Saksnummer',
  [Language.EN]: 'Case number',
};

const CASE_NUMBER_TOOLTIP: Translation = {
  [Language.NB]: 'Klikk for å kopiere saksnummeret',
  [Language.NN]: 'Klikk for å kopiere saksnummeret',
  [Language.EN]: 'Click to copy the case number',
};

const DEADLINE_LABEL: Translation = {
  [Language.NB]: 'Varslet frist',
  [Language.NN]: 'Varsla frist',
  [Language.EN]: 'Deadline',
};

const WEEKS: Record<Language, (n: number) => string> = {
  [Language.NB]: (n) => (n === 1 ? `${n.toString(10)} uke` : `${n.toString(10)} uker`),
  [Language.NN]: (n) => (n === 1 ? `${n.toString(10)} veke` : `${n.toString(10)} veker`),
  [Language.EN]: (n) => (n === 1 ? `${n.toString(10)} week` : `${n.toString(10)} weeks`),
};

const MONTHS: Record<Language, (n: number) => string> = {
  [Language.NB]: (n) => (n === 1 ? `${n.toString(10)} måned` : `${n.toString(10)} måneder`),
  [Language.NN]: (n) => (n === 1 ? `${n.toString(10)} månad` : `${n.toString(10)} månadar`),
  [Language.EN]: (n) => (n === 1 ? `${n.toString(10)} month` : `${n.toString(10)} months`),
};

const FROM: Translation = {
  [Language.NB]: 'fra',
  [Language.NN]: 'frå',
  [Language.EN]: 'from',
};

const FALLBACK_TITLE: Translation = {
  [Language.NB]: 'Klage',
  [Language.NN]: 'Klage',
  [Language.EN]: 'Complaint',
};
