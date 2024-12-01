const CaseList = lazy(() => import('@/app/[lang]/case-list'));
import { CaseListLoading } from '@/app/[lang]/case-list';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { getLanguage } from '@/lib/get-language';
import { Languages, isLanguage } from '@/locales';
import { notFound } from 'next/navigation';
import { Suspense, lazy } from 'react';

interface MetadataProps {
  params: Promise<{ lang: Languages }>;
}

const TITLE: Record<Languages, string> = {
  [Languages.NB]: 'Mine klager og anker',
  [Languages.NN]: 'Mine klagar og ankar',
  [Languages.EN]: 'My complaints and appeals',
};

export async function generateMetadata({ params }: MetadataProps) {
  const lang = await getLanguage(params);

  return {
    title: TITLE[lang],
    lang,
  };
}

interface SakerPageProps {
  params: Promise<{ lang: string }>;
}

export default async function SakerPage({ params }: SakerPageProps) {
  const { lang } = await params;

  if (typeof lang !== 'string' || !isLanguage(lang)) {
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
