import { InfoItem } from '@/components/info-item';
import { TimelineItem } from '@/components/timeline-item';
import { SaksType, getSak } from '@/lib/api';
import { ParagraphIcon } from '@navikt/aksel-icons';
import { HStack, Heading } from '@navikt/ds-react';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{ id: string }>;
}

export default async function SakPage({ params }: Props) {
  const { id } = await params;
  const sak = await getSak(id);

  if (sak === undefined) {
    return notFound();
  }

  const { typeId, saksnummer, events } = sak;

  return (
    <>
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
