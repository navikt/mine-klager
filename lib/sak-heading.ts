import { getYtelseName } from '@/lib/kodeverk';
import { CaseType } from '@/lib/types';
import type { Language, Translation } from '@/locales';

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
  nn: 'Omgjøringskrav som gjeld',
  en: 'Request for reconsideration about',
};

const PREFIX: Record<CaseType, Translation> = {
  [CaseType.KLAGE]: KLAGE_PREFIX,
  [CaseType.ANKE]: ANKE_PREFIX,
  [CaseType.OMGJØRING]: OMGJØRING_PREFIX,
};

export const getSakHeading = async (type: CaseType, innsendingsytelseId: string | null, lang: Language) => {
  if (innsendingsytelseId === null) {
    return `${PREFIX[type][lang]} «${innsendingsytelseId}»`;
  }

  const ytelseName = await getYtelseName(innsendingsytelseId, lang);

  return `${PREFIX[type][lang]} «${ytelseName}»`;
};
