import { INSTANS } from '@/lib/dictionary';
import { formatInnsendingsytelser } from '@/lib/format-innsendingsytelser';
import { getInnsendingsytelserByIds } from '@/lib/kodeverk';
import { CaseType } from '@/lib/types';
import { Language, type Translation } from '@/locales';

const KLAGE_PREFIX: Translation = {
  nb: 'Klage som gjelder',
  nn: 'Klage som gjeld',
  en: 'Complaint about',
};

const ANKE_PREFIX: Translation = {
  nb: 'Anke som gjelder',
  nn: 'Anke som gjeld',
  en: 'Appeal about',
};

const OMGJØRING_PREFIX: Translation = {
  nb: 'Omgjøringskrav som gjelder',
  nn: 'Omgjeringskrav som gjeld',
  en: 'Request for reconsideration about',
};

const GJENOPPTAKSBEGJÆRING_PREFIX: Translation = {
  nb: `Begjæring om gjenopptak av ${INSTANS.trygderetten.nb} sin kjennelse som gjelder`,
  nn: `Krav om gjenopning av ${INSTANS.trygderetten.nn} sin kjennelse som gjeld`,
  en: `Request for reopening of the ${INSTANS.trygderetten.en}'s judgment about`,
};

const PREFIX: Record<CaseType, Translation> = {
  [CaseType.KLAGE]: KLAGE_PREFIX,
  [CaseType.ANKE]: ANKE_PREFIX,
  [CaseType.OMGJØRING]: OMGJØRING_PREFIX,
  [CaseType.GJENOPPTAKSBEGJÆRING]: GJENOPPTAKSBEGJÆRING_PREFIX,
  [CaseType.ANKE_AFTER_2027]: ANKE_PREFIX,
};

export const getSakHeading = async (type: CaseType, innsendingsytelseIdList: string[], lang: Language) => {
  if (innsendingsytelseIdList.length === 0) {
    return `${PREFIX[type][lang]} «${UNKNOWN[lang]}»`;
  }

  const ytelser = await getInnsendingsytelserByIds(innsendingsytelseIdList, lang);
  const formattedYtelser = formatInnsendingsytelser(
    ytelser.map((ytelse) => ytelse.navn),
    lang,
  );

  return `${PREFIX[type][lang]} ${formattedYtelser}`;
};

const UNKNOWN: Translation = {
  [Language.NB]: 'ukjent ytelse',
  [Language.NN]: 'ukjend yting',
  [Language.EN]: 'unknown benefit',
};
