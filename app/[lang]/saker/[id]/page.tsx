import { Heading, HGrid, HStack, LocalAlert } from '@navikt/ds-react';
import { LocalAlertContent, LocalAlertHeader, LocalAlertTitle } from '@navikt/ds-react/LocalAlert';
import { trace } from '@opentelemetry/api';
import { parse } from 'date-fns';
import { headers } from 'next/headers';
import { notFound, unauthorized } from 'next/navigation';
import type { Metadata } from 'next/types';
import { EventList } from '@/app/[lang]/saker/[id]/event-list';
import { WhatHappensNow } from '@/app/[lang]/saker/[id]/what-happens-now/what-happens-now';
import { Actions } from '@/components/actions/actions';
import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { ErrorId } from '@/components/error-id';
import { InfoItem } from '@/components/info-item';
import { MetricEvent } from '@/components/metrics';
import { ReceivedKlageinstans } from '@/components/received-klageinstans';
import { ReceivedVedtaksinstans } from '@/components/received-vedtaksinstans';
import { format, ISO_DATE_FORMAT, PRETTY_DATE_FORMAT } from '@/lib/date';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import { getYtelseName } from '@/lib/kodeverk';
import type { MetricsContextData } from '@/lib/metrics';
import { getSakHeading } from '@/lib/sak-heading';
import { getSak } from '@/lib/server/api';
import { getCurrentPath } from '@/lib/server/current-path';
import { getLanguage, type LanguageParams, resolveLanguageParams } from '@/lib/server/get-language';
import type { Frist, Sak } from '@/lib/types';
import { BehandlingstidUnitType, CASE_TYPE_NAMES } from '@/lib/types';
import { Language, type Translation } from '@/locales';

const tracer = trace.getTracer('mine-klager');

interface Params extends LanguageParams {
  id: string;
  sak: Sak;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { lang, id } = await resolveLanguageParams(params);

  const alternates: Metadata['alternates'] = {
    languages: {
      nb: `/nb/saker/${id}`,
      nn: `/nn/saker/${id}`,
      en: `/en/saker/${id}`,
    },
  };

  try {
    const sak = await getSak(await headers(), id);

    if (sak === undefined) {
      return {
        title: FALLBACK_TITLE[lang],
        description: FALLBACK_DESCRIPTION[lang],
        robots: { index: false, follow: false },
        alternates,
      };
    }

    const { innsendingsytelseId, saksnummer } = sak;

    const ytelseName = innsendingsytelseId === null ? UNKNOWN[lang] : await getYtelseName(innsendingsytelseId, lang);

    return {
      title: `${saksnummer} - ${ytelseName}`,
      description: CASE_DESCRIPTION[lang](saksnummer, ytelseName),
      robots: { index: false, follow: false },
      alternates,
    };
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return unauthorized();
    }

    return {
      title: FALLBACK_TITLE[lang],
      description: FALLBACK_DESCRIPTION[lang],
      robots: { index: false, follow: false },
      alternates,
    };
  }
}

const CASE_DESCRIPTION: Translation<(saksnummer: string, ytelse: string) => string> = {
  [Language.NB]: (saksnummer, ytelse) => `Klagesak ${saksnummer} - ${ytelse}`,
  [Language.NN]: (saksnummer, ytelse) => `Klagesak ${saksnummer} - ${ytelse}`,
  [Language.EN]: (saksnummer, ytelse) => `Complaint case ${saksnummer} - ${ytelse}`,
};

const FALLBACK_DESCRIPTION: Translation = {
  [Language.NB]: 'Klagesak',
  [Language.NN]: 'Klagesak',
  [Language.EN]: 'Complaint case',
};

const UNKNOWN: Translation = {
  [Language.NB]: 'Ukjent ytelse',
  [Language.NN]: 'Ukjend yting',
  [Language.EN]: 'Unknown benefit',
};

export default async function SakPage({ params }: Props) {
  return tracer.startActiveSpan('SakPage', async (span) => {
    try {
      const { lang, id } = await resolveLanguageParams(params);

      span.setAttribute('sak.id', id);

      const sak = await getSak(await headers(), id);
      const path = await getCurrentPath();

      if (sak === undefined) {
        span.setAttribute('sak.found', false);

        return notFound();
      }

      const { typeId, saksnummer, events, innsendingsytelseId, varsletBehandlingstid, mottattKlageinstans } = sak;
      const heading = await getSakHeading(typeId, innsendingsytelseId, lang);

      span.setAttribute('sak.found', true);
      span.setAttribute('sak.typeId', typeId);
      span.setAttribute('sak.events.count', events.length);

      const lastEvent = events.at(-1);
      const hasLastEvent = lastEvent !== undefined;

      const eventCount = events.length;

      const context: MetricsContextData = {
        lang,
        path,
        page: 'sak',
        ytelse: innsendingsytelseId ?? 'UNKNOWN',
        type: CASE_TYPE_NAMES[typeId],
      };

      return (
        <>
          {/** biome-ignore lint/style/useNamingConvention: Metric event naming convention */}
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

          <HStack gap="space-8">
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

          <HGrid
            gap="space-32 space-16"
            marginBlock="space-32 space-0"
            columns={{ xs: 1, sm: 1, md: 1, lg: 1, xl: 2, '2xl': 2 }}
          >
            <EventList sak={sak} lang={lang} context={context} />

            {hasLastEvent ? <WhatHappensNow lastEvent={lastEvent} lang={lang} context={context} /> : null}
          </HGrid>
        </>
      );
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return unauthorized();
      }

      if (error instanceof InternalServerError) {
        const errorLang = await getLanguage(params);
        const traceId = span.spanContext().traceId;

        return (
          <LocalAlert status="error">
            <LocalAlertHeader>
              <LocalAlertTitle>{FETCH_CASE_ERROR_TITLE[errorLang]}</LocalAlertTitle>
            </LocalAlertHeader>
            <LocalAlertContent>
              {FETCH_CASE_ERROR_DESCRIPTION[errorLang]}
              <ErrorId id={traceId} label={TRACE_ID_LABEL[errorLang]} prefix="trace" />
            </LocalAlertContent>
          </LocalAlert>
        );
      }

      throw error;
    } finally {
      span.end();
    }
  });
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

const FETCH_CASE_ERROR_TITLE: Translation = {
  [Language.NB]: 'Kunne ikke hente saken',
  [Language.NN]: 'Kunne ikkje hente saka',
  [Language.EN]: 'Failed to fetch case',
};

const FETCH_CASE_ERROR_DESCRIPTION: Translation = {
  [Language.NB]: 'Vi klarte ikke å hente saken din akkurat nå. Vennligst prøv igjen senere.',
  [Language.NN]: 'Vi klarte ikkje å hente saka di akkurat no. Ver venleg og prøv igjen seinare.',
  [Language.EN]: 'We were unable to fetch your case right now. Please try again later.',
};

const TRACE_ID_LABEL: Translation = {
  [Language.NB]: 'Feilkode',
  [Language.NN]: 'Feilkode',
  [Language.EN]: 'Error code',
};
