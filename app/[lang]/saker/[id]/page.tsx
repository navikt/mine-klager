import { CopyItem } from '@/components/copy-item';
import { DecoratorUpdater } from '@/components/decorator-updater';
import { TimelineItem } from '@/components/timeline-item';
import { getSak } from '@/lib/api';
import { getSakTitle } from '@/lib/sak-title';
import { DEFAULT_LANGUAGE, type Languages } from '@/locales';
import { HStack, Heading } from '@navikt/ds-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string; lang: Languages }>;
}

export default async function SakPage({ params }: Props) {
  const { lang, id } = await params;
  const sak = await getSak(id);

  if (sak === undefined) {
    return notFound();
  }

  const { saksnummer, events, ytelseId } = sak;
  const title = await getSakTitle(ytelseId);

  const path = `/saker/${id}`;

  return (
    <>
      <DecoratorUpdater
        lang={lang}
        path={path}
        breadcrumbs={[
          {
            title,
            url: lang === DEFAULT_LANGUAGE ? path : `/${lang}/saker/${id}`,
          },
        ]}
      />

      <Heading level="1" size="large" spacing>
        Sak
      </Heading>

      <CopyItem label="Saksnummer">{saksnummer}</CopyItem>

      <HStack as="ul" gap="4" marginBlock="4 0">
        {events.map((event) => (
          <TimelineItem key={`${event.type}-${event.date}`} {...event} />
        ))}
      </HStack>
    </>
  );
}
