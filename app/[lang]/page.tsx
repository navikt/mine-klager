const CaseList = lazy(() => import('@/app/[lang]/case-list'));

import { notFound } from 'next/navigation';
import { lazy, Suspense } from 'react';
import { CaseListLoading } from '@/app/[lang]/case-list';
import { TITLE } from '@/app/[lang]/title';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { MetricEvent } from '@/components/metrics';
import type { MetricsContextData } from '@/lib/metrics';
import { getCurrentPath } from '@/lib/server/current-path';
import { getLanguage } from '@/lib/server/get-language';
import { isLanguage, type Language } from '@/locales';

interface Params {
  lang: Language;
}

interface MetadataProps {
  params: Promise<Params>;
}

export async function generateMetadata({ params }: MetadataProps) {
  const lang = await getLanguage(params);

  return { title: TITLE[lang], lang };
}

interface SakerPageProps {
  params: Promise<Params>;
}

export default async function SakerPage({ params }: SakerPageProps) {
  const { lang } = await params;
  const path = await getCurrentPath();

  if (!isLanguage(lang)) {
    return notFound();
  }

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
}
