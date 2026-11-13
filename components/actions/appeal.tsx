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
      navn: ytelse.navn,
      href: getAppealLink(ytelse.id, sak.saksnummer, lang),
    }));
    return (
      <InnsendingsytelseDialog triggerText={APPEAL[lang]} options={options} eventName="send-anke" context={context} />
    );
  }

  return (
    <ButtonLink
      variant="primary"
      href={getAppealLink(sak.innsendingsytelseId ?? sak.innsendingsytelseIdList[0] ?? null, sak.saksnummer, lang)}
      openInNewTab
      eventName="send-anke"
      component="actions"
      context={context}
    >
      {APPEAL[lang]}
    </ButtonLink>
  );
};

const getAppealLink = (innsendingsytelseId: string | null, saksnummmer: string, lang: Language) => {
  if (innsendingsytelseId === null) {
    return getNavKlageUrl(lang);
  }

  return `${KLANG_DOMAIN}/${lang}/anke/${innsendingsytelseId}?saksnummer=${saksnummmer}`;
};

const APPEAL: Translation = {
  [Language.NB]: 'Send anke på klagevedtak',
  [Language.NN]: 'Send anke på klagevedtak',
  [Language.EN]: 'Appeal the complaint decision',
};
