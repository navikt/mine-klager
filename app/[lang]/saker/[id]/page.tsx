import { Heading, HGrid, HStack, LocalAlert } from '@navikt/ds-react';
import { LocalAlertContent, LocalAlertHeader, LocalAlertTitle } from '@navikt/ds-react/LocalAlert';
import { trace } from '@opentelemetry/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { EventList } from '@/app/[lang]/saker/[id]/event-list';
import { WhatHappensNow } from '@/app/[lang]/saker/[id]/what-happens-now/what-happens-now';
import { Actions } from '@/components/actions/actions';
import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { ErrorId } from '@/components/error-id';
import { MetricEvent } from '@/components/metrics';
import { ReceivedKlageinstans } from '@/components/received-klageinstans';
import { VarsletFrist } from '@/components/varslet-frist';
import { InternalServerError } from '@/lib/errors';
import { getYtelseName } from '@/lib/kodeverk';
import { getLogger } from '@/lib/logger';
import type { MetricsContextData } from '@/lib/metrics';
import { getSakHeading } from '@/lib/sak-heading';
import { getSupportedSak } from '@/lib/server/api';
import { getCurrentPath } from '@/lib/server/current-path';
import { type LanguageParams, resolveLanguageParams } from '@/lib/server/get-language';
import { ensureValidLanguage } from '@/lib/server/not-found';
import { recordSpanError } from '@/lib/tracing';
import type { Sak } from '@/lib/types';
import { CASE_TYPE_NAMES } from '@/lib/types';
import { Language, type Translation } from '@/locales';

const tracer = trace.getTracer('mine-klager');
const logger = getLogger('sak-page');

interface Params extends LanguageParams {
  id: string;
  sak: Sak;
}

interface Props {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  await ensureValidLanguage(params);

  const { lang, id } = await resolveLanguageParams(params);

  const alternates: Metadata['alternates'] = {
    languages: {
      nb: `/nb/saker/${id}`,
      nn: `/nn/saker/${id}`,
      en: `/en/saker/${id}`,
    },
  };

  try {
    const sak = await getSupportedSak(id);

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
  } catch {
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
  // Also checked here, since Next renders the page in parallel with the layout. Avoids fetching the case.
  await ensureValidLanguage(params);

  const { lang, id } = await resolveLanguageParams(params);
  const result = await loadSak(id, lang);

  if (result.status === LoadSakStatus.NOT_FOUND) {
    return notFound();
  }

  if (result.status === LoadSakStatus.ERROR) {
    return (
      <LocalAlert status="error">
        <LocalAlertHeader>
          <LocalAlertTitle>{FETCH_CASE_ERROR_TITLE[lang]}</LocalAlertTitle>
        </LocalAlertHeader>
        <LocalAlertContent>
          {FETCH_CASE_ERROR_DESCRIPTION[lang]}
          <ErrorId id={result.traceId} label={TRACE_ID_LABEL[lang]} prefix="trace" />
        </LocalAlertContent>
      </LocalAlert>
    );
  }

  const { sak, heading } = result;
  const { typeId, saksnummer, events, innsendingsytelseId } = sak;
  const path = await getCurrentPath();

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

        <ReceivedKlageinstans sak={sak} lang={lang} />

        <VarsletFrist sak={sak} lang={lang} />
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
}

enum LoadSakStatus {
  FOUND = 0,
  NOT_FOUND = 1,
  ERROR = 2,
}

type SakResult =
  | { status: LoadSakStatus.FOUND; sak: Sak; heading: string }
  | { status: LoadSakStatus.NOT_FOUND }
  | { status: LoadSakStatus.ERROR; traceId: string };

/** Loads the case without rendering, so `notFound()` is called outside the span's `try`. */
const loadSak = async (id: string, lang: Language) =>
  tracer.startActiveSpan('SakPage', async (span): Promise<SakResult> => {
    try {
      span.setAttribute('sak.id', id);

      const sak = await getSupportedSak(id);

      if (sak === undefined) {
        span.setAttribute('sak.found', false);

        logger.warn('Case not found', { caseId: id });

        return { status: LoadSakStatus.NOT_FOUND };
      }

      const heading = await getSakHeading(sak.typeId, sak.innsendingsytelseId, lang);

      span.setAttribute('sak.found', true);
      span.setAttribute('sak.typeId', sak.typeId);
      span.setAttribute('sak.events.count', sak.events.length);

      return { status: LoadSakStatus.FOUND, sak, heading };
    } catch (error) {
      recordSpanError(span, error);

      if (error instanceof InternalServerError) {
        return { status: LoadSakStatus.ERROR, traceId: span.spanContext().traceId };
      }

      throw error;
    } finally {
      span.end();
    }
  });

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
