import { DecoratorUpdater } from '@/components/decorator-updater';
import { InfoItem } from '@/components/info-item';
import { TimelineItem } from '@/components/timeline-item';
import { SaksType, getSak } from '@/lib/api';
import { DEFAULT_LANGUAGE, type Languages } from '@/locales';
import { ParagraphIcon } from '@navikt/aksel-icons';
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

  const { typeId, saksnummer, events } = sak;

  const path = `/saker/${id}`;

  return (
    <>
      <DecoratorUpdater
        lang={lang}
        path={path}
        breadcrumbs={[
          {
            title: sak === undefined ? '' : TYPE_NAMES[sak.typeId],
            url: lang === DEFAULT_LANGUAGE ? path : `/${lang}/saker/${id}`,
          },
        ]}
      />

      <Heading level="1" size="large" spacing>
        {TYPE_NAMES[typeId]}
      </Heading>

      <InfoItem label="Saksnummer">{saksnummer}</InfoItem>

      <HStack as="ul" gap="4">
        {events.map(({ type, date }) => (
          <TimelineItem key={date} date={date} title={type} icon={<ParagraphIcon aria-hidden />} />
        ))}
      </HStack>
    </>
  );
}

const TYPE_NAMES: Record<SaksType, string> = {
  [SaksType.KLAGE]: 'Klage',
  [SaksType.ANKE]: 'Anke',
  [SaksType.ANKE_I_TRYGDERETTEN]: 'Anke i Trygderetten',
  [SaksType.BEHANDLING_ETTER_TRYGDERETTEN_OPPHEVET]: 'Behandling etter Trygderetten opphevet',
  [SaksType.OMGJOERINGSKRAV]: 'Omgjøringskrav',
};
