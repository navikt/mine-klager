import { Language, type Translation } from '@/locales';

type Keys = 'vedtaksinstans' | 'klageinstans' | 'trygderetten' | 'lagmannsretten';

export const UNIT: Record<Keys, Translation> = {
  vedtaksinstans: {
    [Language.NB]: 'Nav vedtaksinstans',
    [Language.NN]: 'Nav vedtaksinstans',
    [Language.EN]: 'Nav Decision-making Unit (Nav vedtaksinstans)',
  },
  klageinstans: {
    [Language.NB]: 'Nav klageinstans',
    [Language.NN]: 'Nav klageinstans',
    [Language.EN]: 'Nav Complaints Unit (Nav klageinstans)',
  },
  trygderetten: {
    [Language.NB]: 'Trygderetten',
    [Language.NN]: 'Trygderetten',
    [Language.EN]: 'National Insurance Court (Trygderetten)',
  },
  lagmannsretten: {
    [Language.NB]: 'Lagmannsretten',
    [Language.NN]: 'Lagmannsretten',
    [Language.EN]: 'Court of Appeal (Lagmannsretten)',
  },
};
