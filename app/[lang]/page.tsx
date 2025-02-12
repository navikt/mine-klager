const CaseList = lazy(() => import('@/app/[lang]/case-list'));
import { CaseListLoading } from '@/app/[lang]/case-list';
import { TITLE } from '@/app/[lang]/title';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { MetricEvent } from '@/components/metrics';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { getCurrentPath } from '@/lib/current-path';
import { getLanguage } from '@/lib/get-language';
import { type Language, isLanguage } from '@/locales';
import { notFound } from 'next/navigation';
import { Suspense, lazy } from 'react';

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

  const context: AmplitudeContextData = { lang, path, page: 'saker' };

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
