import { getYtelseName } from '@/lib/kodeverk';
import type { Languages } from '@/locales';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';

const PREFIX: Record<Languages, string> = {
  nb: 'Klage som gjelder',
  nn: 'Klage som gjeld',
  en: 'Complaint about',
};

export const getSakHeading = async (headers: ReadonlyHeaders, ytelseId: string, lang: Languages) => {
  const ytelseName = await getYtelseName(headers, ytelseId, lang);

  if (!ytelseName.ok) {
    return `${PREFIX[lang]} ${ytelseId}`;
  }

  return `${PREFIX[lang]} «${ytelseName}»`;
};
