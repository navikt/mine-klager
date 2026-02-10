import { Heading, LocalAlert, Skeleton, VStack } from '@navikt/ds-react';
import { LocalAlertContent, LocalAlertHeader, LocalAlertTitle } from '@navikt/ds-react/LocalAlert';
import { trace } from '@opentelemetry/api';
import { headers } from 'next/headers';
import { unauthorized } from 'next/navigation';
import { Disclaimer } from '@/app/[lang]/disclaimer';
import { SakListItem } from '@/app/[lang]/list-item';
import { MetricEvent } from '@/components/metrics';
import { INSTANS } from '@/lib/dictionary';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import type { MetricsContextData } from '@/lib/metrics';
import { getSaker } from '@/lib/server/api';
import { Language, type Translation } from '@/locales';

interface CaseListProps {
  lang: Language;
  context: MetricsContextData;
}

const tracer = trace.getTracer('mine-klager');

const CaseList = async ({ lang, context }: CaseListProps) =>
  tracer.startActiveSpan('CaseList', async (span) => {
    try {
      const sakerResponse = await getSaker(await headers());

      const { saker } = sakerResponse;

      span.setAttribute('cases.count', saker.length);

      return (
        <>
          <MetricEvent eventName="saksliste" domain="saker" context={context} eventData={{ count: saker.length }} />

          <Title caseCount={saker.length} lang={lang} />

          <Disclaimer lang={lang} className="mb-4" />

          <VStack as="ul" gap="space-16">
            {saker.map((sak, index) => (
              <SakListItem key={`${sak.id}-${index}`} sak={sak} lang={lang} context={context} />
            ))}
          </VStack>
        </>
      );
    } catch (error) {
      if (error instanceof UnauthorizedError) {
        return unauthorized();
      }

      if (error instanceof InternalServerError) {
        return <CaseListError lang={lang} />;
      }

      throw error;
    } finally {
      span.end();
    }
  });

interface CaseListErrorProps {
  lang: Language;
}

const CaseListError = ({ lang }: CaseListErrorProps) => (
  <>
    <Title caseCount={0} lang={lang} />

    <Disclaimer lang={lang} className="mb-4" />

    <LocalAlert status="error">
      <LocalAlertHeader>
        <LocalAlertTitle>{FETCH_ERROR_TITLE[lang]}</LocalAlertTitle>
      </LocalAlertHeader>
      <LocalAlertContent>{FETCH_ERROR_DESCRIPTION[lang]}</LocalAlertContent>
    </LocalAlert>
  </>
);

const FETCH_ERROR_TITLE: Translation = {
  [Language.NB]: 'Kunne ikke hente saker',
  [Language.NN]: 'Kunne ikkje hente saker',
  [Language.EN]: 'Failed to fetch cases',
};

const FETCH_ERROR_DESCRIPTION: Translation = {
  [Language.NB]: 'Vi klarte ikke å hente sakene dine akkurat nå. Vennligst prøv igjen senere.',
  [Language.NN]: 'Vi klarte ikkje å hente sakene dine akkurat no. Ver venleg og prøv igjen seinare.',
  [Language.EN]: 'We were unable to fetch your cases right now. Please try again later.',
};

interface CaseListLoadingProps {
  lang: Language;
}

export const CaseListLoading = ({ lang }: CaseListLoadingProps) => (
  <>
    <Title caseCount={0} lang={lang} />

    <VStack as="ul" gap="space-16">
      <Skeleton variant="rectangle" height={196} width="100%" className="rounded-sm shadow-sm" />
      <Skeleton variant="rectangle" height={196} width="100%" className="rounded-sm shadow-sm" />
      <Skeleton variant="rectangle" height={196} width="100%" className="rounded-sm shadow-sm" />
    </VStack>
  </>
);

const HEADING: Translation = {
  [Language.NB]: `Mine saker hos ${INSTANS.klageinstans.nb}`,
  [Language.NN]: `Mine saker hos ${INSTANS.klageinstans.nn}`,
  [Language.EN]: `My cases with ${INSTANS.klageinstans.en}`,
};

interface TitleProps {
  caseCount: number;
  lang: Language;
}

const Title = ({ caseCount, lang }: TitleProps) => (
  <Heading level="1" size="large" spacing>
    {HEADING[lang]} ({caseCount})
  </Heading>
);

export default CaseList;
