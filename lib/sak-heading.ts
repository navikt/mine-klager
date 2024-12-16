import { getYtelseName } from '@/lib/kodeverk';
import type { Languages } from '@/locales';

const PREFIX: Record<Languages, string> = {
  nb: 'Klage som gjelder',
  nn: 'Klage som gjeld',
  en: 'Complaint about',
};

export const getSakHeading = async (ytelseId: string, lang: Languages) => {
  const ytelseName = await getYtelseName(ytelseId, lang);

  return `${PREFIX[lang]} «${ytelseName}»`;
};
