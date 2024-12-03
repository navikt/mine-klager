import { EventType, type Sak } from '@/lib/api';
import { Languages } from '@/locales';
import { Button } from '@navikt/ds-react';

interface EventActionsProps {
  sak: Sak;
  eventType: EventType;
  lang: Languages;
}

export const EventActions = (props: EventActionsProps) => {
  const { eventType } = props;

  switch (eventType) {
    case EventType.KLAGE_MOTTATT_VEDTAKSINSTANS:
      return (
        <>
          <SeeComplaint {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} />
        </>
      );
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return (
        <>
          <SeeComplaint {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} />
        </>
      );
    case EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <>
          <SeeComplaint {...props} />
        </>
      );
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return (
        <>
          <SeeComplaint {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} />
        </>
      );
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <>
          <SeeAppeal {...props} />
        </>
      );
    case EventType.ANKE_SENDT_TRYGDERETTEN:
      return (
        <>
          <SeeAppeal {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} />
        </>
      );
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
      return (
        <>
          <SeeAppeal {...props} />
        </>
      );
    case EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN:
      return (
        <>
          <SeeAppeal {...props} />
        </>
      );
  }
};

enum CaseTypeEnum {
  KLAGE = 'klage',
  ANKE = 'anke',
}

interface CaseType {
  caseType: CaseTypeEnum;
}

const SeeComplaint = ({ sak, lang }: EventActionsProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button role="link" size="small" variant="tertiary" as="a" href={`https://klage.nav.no/${lang}/`}>
    {SEE_COMPLAINT[lang]}
  </Button>
);

const SeeAppeal = ({ sak, lang }: EventActionsProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button role="link" size="small" variant="tertiary" as="a" href={`https://klage.nav.no/${lang}/`}>
    {SEE_APPEAL[lang]}
  </Button>
);

const EttersendDokumentasjon = ({ sak, lang, caseType }: EventActionsProps & CaseType) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button
    role="link"
    size="small"
    variant="secondary"
    as="a"
    href={`https://klage.nav.no/${lang}/ettersendelse/${caseType}/${sak.ytelseId}?saksnummer=${sak.saksnummer}`}
  >
    {ETTERSEND_DOKUMENTASJON[lang]}
  </Button>
);

const SEE_COMPLAINT: Record<Languages, string> = {
  [Languages.NB]: 'Se klage',
  [Languages.NN]: 'Sjå klage',
  [Languages.EN]: 'View complaint',
};

const ETTERSEND_DOKUMENTASJON: Record<Languages, string> = {
  [Languages.NB]: 'Ettersend dokumentasjon',
  [Languages.NN]: 'Ettersend dokumentasjon',
  [Languages.EN]: 'Submit additional documentation',
};

const SEE_APPEAL: Record<Languages, string> = {
  [Languages.NB]: 'Se anke',
  [Languages.NN]: 'Sjå anke',
  [Languages.EN]: 'View appeal',
};
