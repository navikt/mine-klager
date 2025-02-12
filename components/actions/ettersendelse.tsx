import { ButtonLink } from '@/components/button-link';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { getNavKlageUrl } from '@/lib/get-nav-klage-url';
import { KLANG_DOMAIN } from '@/lib/klang';
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
  context: AmplitudeContextData;
}

interface CaseTypeProps {
  caseType: CaseTypeEnum;
}

const EttersendDokumentasjon = ({ sak, lang, caseType, context }: EttersendDokumentasjonProps & CaseTypeProps) => (
  <ButtonLink
    variant="primary"
    href={getEttersendelseLink(sak, lang, caseType)}
    openInNewTab
    eventName="action"
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
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.KLAGE} />
);

export const EttersendDokumentasjonAnke = (props: EttersendDokumentasjonProps) => (
  <EttersendDokumentasjon {...props} caseType={CaseTypeEnum.ANKE} />
);

const ETTERSEND_DOKUMENTASJON: Translation = {
  [Language.NB]: 'Ettersend dokumentasjon',
  [Language.NN]: 'Ettersend dokumentasjon',
  [Language.EN]: 'Submit additional documentation',
};
