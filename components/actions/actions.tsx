import { Appeal } from '@/components/actions/appeal';
import { ArchiveLink } from '@/components/actions/archive';
import { EttersendDokumentasjonAnke, EttersendDokumentasjonKlage } from '@/components/actions/ettersendelse';
import { EventType, type Sak, type SakEvent } from '@/lib/types';
import type { Language } from '@/locales';
import { HStack } from '@navikt/ds-react';

interface ActionsProps {
  sak: Sak;
  sakEvent: SakEvent;
  lang: Language;
}

export const Actions = (props: ActionsProps): React.ReactNode => {
  const { sakEvent } = props;

  switch (sakEvent.type) {
    case EventType.KLAGE_MOTTATT_VEDTAKSINSTANS:
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer>
          <EttersendDokumentasjonKlage {...props} />
          <ArchiveLink lang={props.lang} />
        </ActionContainer>
      );
    case EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <ActionContainer>
          <Appeal {...props} />
          <ArchiveLink lang={props.lang} />
        </ActionContainer>
      );
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer>
          <EttersendDokumentasjonAnke {...props} />
          <ArchiveLink lang={props.lang} />
        </ActionContainer>
      );
    case EventType.ANKE_SENDT_TRYGDERETTEN:
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
    case EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN:
      return (
        <ActionContainer>
          <ArchiveLink lang={props.lang} />
        </ActionContainer>
      );
  }
};

const ActionContainer = ({ children }: { children: React.ReactNode }) => (
  <HStack gap="2" align="center" justify="start" flexShrink="0" marginBlock="8 0">
    {children}
  </HStack>
);
