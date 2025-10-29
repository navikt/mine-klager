import { ButtonLink } from '@/components/button-link';
import { getNavKlageUrl } from '@/lib/get-nav-klage-url';
import { KLANG_DOMAIN } from '@/lib/klang';
import type { MetricsContextData } from '@/lib/metrics';
import type { Sak, SakEvent } from '@/lib/types';
import { Language, type Translation } from '@/locales';

export enum CaseTypeEnum {
  KLAGE = 'klage',
  ANKE = 'anke',
}

interface EttersendDokumentasjonProps {
  sak: Sak;
  sakEvent: SakEvent;
  lang: Language;
  context: MetricsContextData;
}

interface CaseTypeProps {
  caseType: CaseTypeEnum;
}

interface EventNameProps {
  eventName: string;
}

const EttersendDokumentasjon = ({
  sak,
  lang,
  caseType,
  eventName,
  context,
}: EttersendDokumentasjonProps & CaseTypeProps & EventNameProps) => (
  <ButtonLink
    variant="primary"
    href={getEttersendelseLink(sak, lang, caseType)}
    openInNewTab
    eventName={eventName}
    component="actions"
    context={context}
  >
    {ETTERSEND_DOKUMENTASJON[lang]}
  </ButtonLink>
);

const getEttersendelseLink = (sak: Sak, lang: Language, caseType: CaseTypeEnum) => {
  if (sak.innsendingsytelseId === null) {
    return getNavKlageUrl(lang);
  }

  return `${KLANG_DOMAIN}/${lang}/ettersendelse/${caseType}/${sak.innsendingsytelseId}?saksnummer=${sak.saksnummer}&ka`;
};

export const EttersendDokumentasjonKlage = (props: EttersendDokumentasjonProps) => (
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} eventName="ettersend-dokumentasjon-klage" />
);

export const EttersendDokumentasjonAnke = (props: EttersendDokumentasjonProps) => (
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} eventName="ettersend-dokumentasjon-anke" />
);

const ETTERSEND_DOKUMENTASJON: Translation = {
  [Language.NB]: 'Ettersend dokumentasjon',
  [Language.NN]: 'Ettersend dokumentasjon',
  [Language.EN]: 'Submit additional documentation',
};
