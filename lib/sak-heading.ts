import { INSTANS } from '@/lib/dictionary';
import { getYtelseName } from '@/lib/kodeverk';
import { getLogger } from '@/lib/logger';
import { CaseType } from '@/lib/types';
import { Language, type Translation } from '@/locales';

const logger = getLogger('sak-heading');

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
};

export const getSakHeading = async (type: CaseType, innsendingsytelseId: string | null, lang: Language) => {
  if (innsendingsytelseId === null) {
    return `${PREFIX[type][lang]} «${UNKNOWN[lang]}»`;
  }

  let ytelseName: string;

  try {
    ytelseName = await getYtelseName(innsendingsytelseId, lang);
  } catch (error) {
    logger.error('Failed to get ytelse name for heading', {
      innsendingsytelseId,
      error: error instanceof Error ? error.message : 'Unknown error',
    });
    ytelseName = innsendingsytelseId;
  }

  return `${PREFIX[type][lang]} «${ytelseName}»`;
};

const UNKNOWN: Translation = {
  [Language.NB]: 'ukjent ytelse',
  [Language.NN]: 'ukjend yting',
  [Language.EN]: 'unknown benefit',
};
