import { AllEvents } from '@/app/[lang]/saker/[id]/all-events';
import { WhatHappensNow } from '@/app/[lang]/saker/[id]/what-happens-now';
import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { InfoItem } from '@/components/info-item';
import { ReceivedKlageinstans } from '@/components/received-klageinstans';
import { ReceivedVedtaksinstans } from '@/components/received-vedtaksinstans';
import { getSak } from '@/lib/api';
import { PRETTY_DATE_FORMAT, format } from '@/lib/date';
import { getYtelseName } from '@/lib/kodeverk';
import { getSakHeading } from '@/lib/sak-heading';
import { BehandlingstidUnitType } from '@/lib/types';
import type { Frist, Sak } from '@/lib/types';
import { DEFAULT_LANGUAGE, Languages, type Translation, isLanguage } from '@/locales';
import { HGrid, HStack, Heading, VStack } from '@navikt/ds-react';
import { headers } from 'next/headers';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string; lang: Languages; sak: Sak }>;
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
  [Languages.NB]: 'Ukjent',
  [Languages.NN]: 'Ukjent',
  [Languages.EN]: 'Unknown',
};

export default async function SakPage({ params }: Props) {
  const { lang, id } = await params;

  const sak = await getSak(await headers(), id);

  if (sak === undefined || !isLanguage(lang)) {
    return notFound();
  }

  const { typeId: type, saksnummer, events, innsendingsytelseId, varsletBehandlingstid, mottattKlageinstans } = sak;
  const heading = await getSakHeading(type, innsendingsytelseId, lang);

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

      <HStack gap="2">
        <CopyItem label={CASE_NUMBER_LABEL[lang]} tooltip={CASE_NUMBER_TOOLTIP[lang]}>
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

      <HGrid gap="8 4" marginBlock="8 0" columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2, '2xl': 2 }}>
        <AllEvents sak={sak} lang={lang} />

        <VStack gap="8">
          <WhatHappensNow lastEvent={lastEvent} lang={lang} />
        </VStack>
      </HGrid>
    </>
  );
}

const formatBehandlingstid = (
  { varsletBehandlingstidUnitTypeId, varsletBehandlingstidUnits, varsletFrist }: Frist,
  mottattKlageinstans: string,
  lang: Languages,
) => {
  const unit =
    varsletBehandlingstidUnitTypeId === BehandlingstidUnitType.WEEKS
      ? WEEKS[lang](varsletBehandlingstidUnits)
      : MONTHS[lang](varsletBehandlingstidUnits);

  const from = FROM[lang];

  const mottatt = format(new Date(mottattKlageinstans), PRETTY_DATE_FORMAT, lang);
  const varslet = format(new Date(varsletFrist), PRETTY_DATE_FORMAT, lang);

  return `${unit} ${from} ${mottatt} (${varslet})`;
};

const CASE_NUMBER_LABEL: Translation = {
  [Languages.NB]: 'Saksnummer',
  [Languages.NN]: 'Saksnummer',
  [Languages.EN]: 'Case number',
};

const CASE_NUMBER_TOOLTIP: Translation = {
  [Languages.NB]: 'Klikk for å kopiere saksnummeret',
  [Languages.NN]: 'Klikk for å kopiere saksnummeret',
  [Languages.EN]: 'Click to copy the case number',
};

const DEADLINE_LABEL: Translation = {
  [Languages.NB]: 'Varslet frist',
  [Languages.NN]: 'Varsla frist',
  [Languages.EN]: 'Deadline',
};

const WEEKS: Record<Languages, (n: number) => string> = {
  [Languages.NB]: (n) => (n === 1 ? `${n.toString(10)} uke` : `${n.toString(10)} uker`),
  [Languages.NN]: (n) => (n === 1 ? `${n.toString(10)} veke` : `${n.toString(10)} veker`),
  [Languages.EN]: (n) => (n === 1 ? `${n.toString(10)} week` : `${n.toString(10)} weeks`),
};

const MONTHS: Record<Languages, (n: number) => string> = {
  [Languages.NB]: (n) => (n === 1 ? `${n.toString(10)} måned` : `${n.toString(10)} måneder`),
  [Languages.NN]: (n) => (n === 1 ? `${n.toString(10)} månad` : `${n.toString(10)} månadar`),
  [Languages.EN]: (n) => (n === 1 ? `${n.toString(10)} month` : `${n.toString(10)} months`),
};

const FROM: Translation = {
  [Languages.NB]: 'fra',
  [Languages.NN]: 'frå',
  [Languages.EN]: 'from',
};

const FALLBACK_TITLE: Translation = {
  [Languages.NB]: 'Klage',
  [Languages.NN]: 'Klage',
  [Languages.EN]: 'Complaint',
};
