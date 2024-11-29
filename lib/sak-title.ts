import { getYtelseName } from '@/lib/kodeverk';

export const getSakTitle = async (ytelseId: string) => {
  const ytelseName = await getYtelseName(ytelseId);

  return `Klage på «${ytelseName}»`;
};
