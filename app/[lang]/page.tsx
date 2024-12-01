const ActiveList = lazy(() => import('@/app/[lang]/active'));
import { DecoratorUpdater } from '@/components/decorator-updater';
import { isLanguage } from '@/locales';
import { Heading, Skeleton } from '@navikt/ds-react';
import { notFound } from 'next/navigation';
import { Suspense, lazy } from 'react';

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

      <Heading level="1" size="large" spacing>
        Mine klager og anker ({lang})
      </Heading>

      <Suspense
        fallback={
          <section>
            <Heading level="2" size="medium" spacing>
              Aktive saker (0)
            </Heading>

            <Skeleton variant="rounded" height={200} width="100%" />
          </section>
        }
      >
        <ActiveList lang={lang} />
      </Suspense>
    </>
  );
}
