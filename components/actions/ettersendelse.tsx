import { ButtonLink } from '@/components/button-link';
import { InnsendingsytelseDialog } from '@/components/innsendingsytelse-dialog';
import { getNavKlageUrl } from '@/lib/get-nav-klage-url';
import { KLANG_DOMAIN } from '@/lib/klang';
import { getInnsendingsytelserByIds } from '@/lib/kodeverk';
import type { MetricsContextData } from '@/lib/metrics';
import type { Sak, SakEvent } from '@/lib/types';
import { Language, type Translation } from '@/locales';

enum CaseTypeEnum {
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

const EttersendDokumentasjon = async ({
  sak,
  lang,
  caseType,
  eventName,
  context,
}: EttersendDokumentasjonProps & CaseTypeProps & EventNameProps) => {
  if (sak.innsendingsytelseIdList.length >= 2) {
    const ytelser = await getInnsendingsytelserByIds(sak.innsendingsytelseIdList, lang);

    const options = ytelser.map((ytelse) => ({
      navn: ytelse.navn,
      href: getEttersendelseLink(ytelse.id, sak.saksnummer, lang, caseType),
    }));
    return (
      <InnsendingsytelseDialog
        triggerText={ETTERSEND_DOKUMENTASJON[lang]}
        options={options}
        eventName={eventName}
        context={context}
      />
    );
  }

  return (
    <ButtonLink
      variant="primary"
      href={getEttersendelseLink(
        sak.innsendingsytelseId ?? sak.innsendingsytelseIdList[0] ?? null,
        sak.saksnummer,
        lang,
        caseType,
      )}
      openInNewTab
      eventName={eventName}
      component="actions"
      context={context}
    >
      {ETTERSEND_DOKUMENTASJON[lang]}
    </ButtonLink>
  );
};

const getEttersendelseLink = (
  innsendingsytelseId: string | null,
  saksnummmer: string,
  lang: Language,
  caseType: CaseTypeEnum,
) => {
  if (innsendingsytelseId === null) {
    return getNavKlageUrl(lang);
  }

  return `${KLANG_DOMAIN}/${lang}/ettersendelse/${caseType}/${innsendingsytelseId}?saksnummer=${saksnummmer}&ka`;
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
