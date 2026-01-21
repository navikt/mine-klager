import { HStack } from '@navikt/ds-react';
import { Appeal } from '@/components/actions/appeal';
import { ArchiveLink } from '@/components/actions/archive';
import { EttersendDokumentasjonAnke, EttersendDokumentasjonKlage } from '@/components/actions/ettersendelse';
import type { MetricsContextData } from '@/lib/metrics';
import { EventType, type Sak, type SakEvent } from '@/lib/types';
import type { Language } from '@/locales';

interface ActionsProps {
  sak: Sak;
  sakEvent: SakEvent;
  lang: Language;
  context: MetricsContextData;
}

export const Actions = (props: ActionsProps): React.ReactNode => {
  const { sakEvent, lang, context } = props;

  switch (sakEvent.type) {
    case EventType.KLAGE_MOTTATT_VEDTAKSINSTANS:
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer lang={lang} context={context}>
          <EttersendDokumentasjonKlage {...props} />
        </ActionContainer>
      );
    case EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <ActionContainer lang={lang} context={context}>
          <Appeal {...props} />
        </ActionContainer>
      );
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return (
        <ActionContainer lang={lang} context={context}>
          <EttersendDokumentasjonAnke {...props} />
        </ActionContainer>
      );
    case EventType.ANKE_SENDT_TRYGDERETTEN:
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
    case EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN:
      return <ActionContainer lang={lang} context={context} />;
  }
};

interface ActionContainerProps {
  lang: Language;
  children?: React.ReactNode;
  context: MetricsContextData;
}

const ActionContainer = ({ children, lang, context }: ActionContainerProps) => (
  <HStack gap="space-8" align="center" justify="start" flexShrink="0" marginBlock="space-32 space-0">
    <ArchiveLink lang={lang} context={context} />
    {children}
  </HStack>
);
