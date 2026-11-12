import { ButtonLink } from '@/components/button-link';
import { InnsendingsytelseDialog } from '@/components/innsendingsytelse-dialog';
import { getNavKlageUrl } from '@/lib/get-nav-klage-url';
import { KLANG_DOMAIN } from '@/lib/klang';
import { getInnsendingsytelserByIds } from '@/lib/kodeverk';
import type { MetricsContextData } from '@/lib/metrics';
import type { Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface AppealProps {
  sak: Sak;
  lang: Language;
  context: MetricsContextData;
}

export const Appeal = async ({ sak, lang, context }: AppealProps) => {
  if (sak.innsendingsytelseIdList.length >= 2) {
    const ytelser = await getInnsendingsytelserByIds(sak.innsendingsytelseIdList, lang);

    const options = ytelser.map((ytelse) => ({
      id: ytelse.id,
      navn: ytelse.navn,
      href: getAppealLink(ytelse.id, sak.saksnummer, lang),
    }));
    return (
      <InnsendingsytelseDialog
        lang={lang}
        triggerText={APPEAL[lang]}
        options={options}
        eventName="send-anke"
        context={context}
        title={APPEAL_DIALOG_TITLE[lang]}
      />
    );
  }

  return (
    <ButtonLink
      variant="primary"
      href={getAppealLink(sak.innsendingsytelseIdList[0], sak.saksnummer, lang)}
      openInNewTab
      eventName="send-anke"
      component="actions"
      context={context}
    >
      {APPEAL[lang]}
    </ButtonLink>
  );
};

const getAppealLink = (innsendingsytelseId: string | undefined, saksnummmer: string, lang: Language) => {
  if (innsendingsytelseId === undefined) {
    return getNavKlageUrl(lang);
  }

  return `${KLANG_DOMAIN}/${lang}/anke/${innsendingsytelseId}?saksnummer=${saksnummmer}`;
};

const APPEAL: Translation = {
  [Language.NB]: 'Send anke på klagevedtak',
  [Language.NN]: 'Send anke på klagevedtak',
  [Language.EN]: 'Appeal the complaint decision',
};

const APPEAL_DIALOG_TITLE: Translation = {
  [Language.NB]: 'Velg hva du vil anke på',
  [Language.NN]: 'Velg kva du vil anke på',
  [Language.EN]: 'Select what you want to appeal',
};
