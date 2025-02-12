import { ButtonLink } from '@/components/button-link';
import type { AmplitudeContextData } from '@/lib/amplitude/types';
import { getNavKlageUrl } from '@/lib/get-nav-klage-url';
import { KLANG_DOMAIN } from '@/lib/klang';
import type { Sak } from '@/lib/types';
import { Language, type Translation } from '@/locales';

interface AppealProps {
  sak: Sak;
  lang: Language;
  context: AmplitudeContextData;
}

export const Appeal = ({ sak, lang, context }: AppealProps) => (
  <ButtonLink
    variant="primary"
    href={getAppealLink(sak, lang)}
    openInNewTab
    eventName="action"
    component="actions"
    context={context}
  >
    {APPEAL[lang]}
  </ButtonLink>
);

const getAppealLink = (sak: Sak, lang: Language) => {
  if (sak.innsendingsytelseId === null) {
    return getNavKlageUrl(lang);
  }

  return `${KLANG_DOMAIN}/${lang}/anke/${sak.innsendingsytelseId}?saksnummer=${sak.saksnummer}`;
};

const APPEAL: Translation = {
  [Language.NB]: 'Send anke på klagevedtak',
  [Language.NN]: 'Send anke på klagevedtak',
  [Language.EN]: 'Appeal the complaint decision',
};
