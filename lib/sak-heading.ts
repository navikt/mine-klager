import { getYtelseName } from '@/lib/kodeverk';
import type { Languages } from '@/locales';

const PREFIX: Record<Languages, string> = {
  nb: 'Klage som gjelder',
  nn: 'Klage som gjeld',
  en: 'Complaint about',
};

export const getSakHeading = async (ytelseId: string, lang: Languages) => {
  const ytelseName = await getYtelseName(ytelseId, lang);

  if (!ytelseName.ok) {
    return `${PREFIX[lang]} ${ytelseId}`;
  }

  return `${PREFIX[lang]} «${ytelseName.value}»`;
};
