import { Appeal, EttersendDokumentasjonAnke, EttersendDokumentasjonKlage } from '@/components/timeline/event-actions';
import { TimelineItemContent } from '@/components/timeline/timeline-item-content';
import type { Sak, SakEvent } from '@/lib/types';
import { EventType } from '@/lib/types';
import type { Languages } from '@/locales';
import { HStack } from '@navikt/ds-react';

interface LastEventItemProps {
  sakEvent: SakEvent;
  sak: Sak;
  lang: Languages;
}

export const LastEventItem = (props: LastEventItemProps) => (
  <TimelineItemContent as="section" {...props}>
    <LastEventActions {...props} />
  </TimelineItemContent>
);

const LastEventActions = (props: LastEventItemProps): React.ReactNode => {
  switch (props.sakEvent.type) {
    case EventType.KLAGE_MOTTATT_VEDTAKSINSTANS:
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer>
          <EttersendDokumentasjonKlage {...props} />
        </ActionContainer>
      );
    case EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <ActionContainer>
          <Appeal {...props} />
        </ActionContainer>
      );
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer>
          <EttersendDokumentasjonAnke {...props} />
        </ActionContainer>
      );
    case EventType.ANKE_SENDT_TRYGDERETTEN:
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
    case EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN:
      return null;
  }
};

const ActionContainer = ({ children }: { children: React.ReactNode }) => (
  <HStack gap="2" align="center" justify="end" flexShrink="0" className="flex-row-reverse">
    {children}
  </HStack>
);
