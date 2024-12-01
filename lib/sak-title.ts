import { getYtelseName } from '@/lib/kodeverk';
import type { Languages } from '@/locales';

const PREFIX: Record<Languages, string> = {
  nb: 'Klage på',
  nn: 'Klage på',
  en: 'Complaint about',
};

export const getSakTitle = async (ytelseId: string, lang: Languages) => {
  const ytelseName = await getYtelseName(ytelseId);

  return `${PREFIX[lang]} «${ytelseName}»`;
};
