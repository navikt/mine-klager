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
  const { sakEvent, lang } = props;

  switch (sakEvent.type) {
    case EventType.KLAGE_MOTTATT_VEDTAKSINSTANS:
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer lang={lang}>
          <EttersendDokumentasjonKlage {...props} />
        </ActionContainer>
      );
    case EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <ActionContainer lang={lang}>
          <Appeal {...props} />
        </ActionContainer>
      );
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer lang={lang}>
          <EttersendDokumentasjonAnke {...props} />
        </ActionContainer>
      );
    case EventType.ANKE_SENDT_TRYGDERETTEN:
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
    case EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN:
      return <ActionContainer lang={lang} />;
  }
};

interface ActionContainerProps {
  lang: Language;
  children?: React.ReactNode;
}

const ActionContainer = ({ children, lang }: ActionContainerProps) => (
  <HStack gap="2" align="center" justify="start" flexShrink="0" marginBlock="8 0">
    <ArchiveLink lang={lang} />
    {children}
  </HStack>
);
