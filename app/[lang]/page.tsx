const CaseList = lazy(() => import('@/app/[lang]/case-list'));
import { CaseListLoading } from '@/app/[lang]/case-list';
import { TITLE } from '@/app/[lang]/title';
import { DecoratorUpdater } from '@/components/decorator-updater';
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

  if (!isLanguage(lang)) {
    return notFound();
  }

  return (
    <>
      <DecoratorUpdater lang={lang} />

      <Suspense fallback={<CaseListLoading lang={lang} />}>
        <CaseList lang={lang} />
      </Suspense>
    </>
  );
}
