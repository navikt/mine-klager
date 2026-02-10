const CaseList = lazy(() => import('@/app/[lang]/case-list'));

import { trace } from '@opentelemetry/api';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next/types';
import { lazy, Suspense } from 'react';
import { CaseListLoading } from '@/app/[lang]/case-list';
import { TITLE } from '@/app/[lang]/title';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { MetricEvent } from '@/components/metrics';
import { INSTANS } from '@/lib/dictionary';
import type { MetricsContextData } from '@/lib/metrics';
import { getCurrentPath } from '@/lib/server/current-path';
import { getLanguage } from '@/lib/server/get-language';
import { isLanguage, Language, type Translation } from '@/locales';

interface Params {
  lang: Language;
}

interface MetadataProps {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: MetadataProps): Promise<Metadata> {
  const lang = await getLanguage(params);

  return {
    title: TITLE[lang],
    description: DESCRIPTION[lang],
    robots: { index: false, follow: false },
    alternates: {
      languages: {
        nb: '/nb',
        nn: '/nn',
        en: '/en',
      },
    },
  };
}

const DESCRIPTION: Translation = {
  [Language.NB]: `Se og følg opp dine klagesaker hos ${INSTANS.klageinstans.nb}.`,
  [Language.NN]: `Sjå og følg opp klagesakene dine hjå ${INSTANS.klageinstans.nn}.`,
  [Language.EN]: `View and follow up on your complaint cases with ${INSTANS.klageinstans.en}.`,
};

interface SakerPageProps {
  params: Promise<Params>;
}

const tracer = trace.getTracer('mine-klager');

export default async function SakerPage({ params }: SakerPageProps) {
  return tracer.startActiveSpan('SakerPage', async (span) => {
    try {
      const { lang } = await params;
      const path = await getCurrentPath();

      if (!isLanguage(lang)) {
        return notFound();
      }

      span.setAttribute('page.lang', lang);

      const context: MetricsContextData = { lang, path, page: 'saker' };

      return (
        <>
          <MetricEvent domain="saker" context={context} />

          <DecoratorUpdater lang={lang} />

          <Suspense fallback={<CaseListLoading lang={lang} />}>
            <CaseList lang={lang} context={context} />
          </Suspense>
        </>
      );
    } finally {
      span.end();
    }
  });
}
