import { isDeployedToProd } from '@/lib/environment';
import { EventType } from '@/lib/types';
import type { Sak } from '@/lib/types';
import { Languages } from '@/locales';
import { Button } from '@navikt/ds-react';

interface EventActionsProps {
  sak: Sak;
  eventType: EventType;
  lang: Languages;
}

export const LastEventActions = (props: EventActionsProps) => {
  const { eventType } = props;

  switch (eventType) {
    case EventType.KLAGE_MOTTATT_VEDTAKSINSTANS:
      return (
        <>
          <ViewComplaint {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} />
        </>
      );
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return (
        <>
          <ViewComplaint {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} />
        </>
      );
    case EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewComplaint {...props} />
          <Appeal {...props} />
        </>
      );
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return (
        <>
          <ViewComplaint {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} />
        </>
      );
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewAppeal {...props} />
        </>
      );
    case EventType.ANKE_SENDT_TRYGDERETTEN:
      return (
        <>
          <ViewAppeal {...props} />
          <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} />
        </>
      );
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewAppeal {...props} />
        </>
      );
    case EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewAppeal {...props} />
        </>
      );
  }
};

export const EventActions = (props: EventActionsProps) => {
  const { eventType } = props;

  switch (eventType) {
    case EventType.KLAGE_MOTTATT_VEDTAKSINSTANS:
      return (
        <>
          <ViewComplaint {...props} />
        </>
      );
    case EventType.KLAGE_MOTTATT_KLAGEINSTANS:
      return (
        <>
          <ViewComplaint {...props} />
        </>
      );
    case EventType.KLAGE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewComplaint {...props} />
        </>
      );
    case EventType.ANKE_MOTTATT_KLAGEINSTANS:
      return (
        <>
          <ViewComplaint {...props} />
        </>
      );
    case EventType.ANKE_AVSLUTTET_I_KLAGEINSTANS:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewAppeal {...props} />
        </>
      );
    case EventType.ANKE_SENDT_TRYGDERETTEN:
      return (
        <>
          <ViewAppeal {...props} />
        </>
      );
    case EventType.ANKE_AVSLUTTET_I_TRYGDERETTEN:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewAppeal {...props} />
        </>
      );
    case EventType.ANKE_KJENNELSE_MOTTATT_FRA_TRYGDERETTEN:
      return (
        <>
          <ViewVedtak {...props} />
          <ViewAppeal {...props} />
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

const KLANG_DOMAIN = isDeployedToProd ? 'https://klage.nav.no' : 'https://klage.intern.dev.nav.no';

const ViewVedtak = ({ sak, lang }: EventActionsProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button role="link" variant="primary" as="a" href={`${KLANG_DOMAIN}/${lang}/`} onClick={(e) => e.stopPropagation()}>
    {VIEW_VEDTAK[lang]}
  </Button>
);

const ViewComplaint = ({ sak, lang }: EventActionsProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button role="link" variant="tertiary" as="a" href={`${KLANG_DOMAIN}/${lang}/`} onClick={(e) => e.stopPropagation()}>
    {VIEW_COMPLAINT[lang]}
  </Button>
);

const ViewAppeal = ({ sak, lang }: EventActionsProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button role="link" variant="tertiary" as="a" href={`${KLANG_DOMAIN}/${lang}/`} onClick={(e) => e.stopPropagation()}>
    {VIEW_APPEAL[lang]}
  </Button>
);

const EttersendDokumentasjon = ({ sak, lang, caseType }: EventActionsProps & CaseType) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button
    role="link"
    variant="tertiary"
    as="a"
    href={`${KLANG_DOMAIN}/${lang}/ettersendelse/${caseType}/${sak.ytelseId}?saksnummer=${sak.saksnummer}`}
    onClick={(e) => e.stopPropagation()}
  >
    {ETTERSEND_DOKUMENTASJON[lang]}
  </Button>
);

const Appeal = ({ sak, lang }: EventActionsProps) => (
  // biome-ignore lint/a11y/useSemanticElements: Button as link.
  <Button
    role="link"
    variant="tertiary"
    as="a"
    href={`${KLANG_DOMAIN}/${lang}/anke/${sak.ytelseId}?saksnummer=${sak.saksnummer}`}
    onClick={(e) => e.stopPropagation()}
  >
    {APPEAL[lang]}
  </Button>
);

const VIEW_VEDTAK: Record<Languages, string> = {
  [Languages.NB]: 'Se vedtak',
  [Languages.NN]: 'Sjå vedtak',
  [Languages.EN]: 'View decision',
};

const VIEW_COMPLAINT: Record<Languages, string> = {
  [Languages.NB]: 'Se klage',
  [Languages.NN]: 'Sjå klage',
  [Languages.EN]: 'View complaint',
};

const ETTERSEND_DOKUMENTASJON: Record<Languages, string> = {
  [Languages.NB]: 'Ettersend dokumentasjon',
  [Languages.NN]: 'Ettersend dokumentasjon',
  [Languages.EN]: 'Submit additional documentation',
};

const VIEW_APPEAL: Record<Languages, string> = {
  [Languages.NB]: 'Se anke',
  [Languages.NN]: 'Sjå anke',
  [Languages.EN]: 'View appeal',
};

const APPEAL: Record<Languages, string> = {
  [Languages.NB]: 'Send anke på klagevedtak',
  [Languages.NN]: 'Send anke på klagevedtak',
  [Languages.EN]: 'Appeal the complaint decision',
};
