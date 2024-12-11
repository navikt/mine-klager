import { getYtelseName } from '@/lib/kodeverk';
import type { Languages } from '@/locales';

const PREFIX: Record<Languages, string> = {
  nb: 'Klage som gjelder',
  nn: 'Klage som gjeld',
  en: 'Complaint about',
};

export const getSakHeading = async (token: string, ytelseId: string, lang: Languages) => {
  const ytelseName = await getYtelseName(token, ytelseId, lang);

  return `${PREFIX[lang]} «${ytelseName}»`;
};
