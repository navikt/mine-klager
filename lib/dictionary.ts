import { Languages, type Translation } from '@/locales';

type Keys = 'vedtaksinstans' | 'klageinstans' | 'trygderetten' | 'trygderettens' | 'lagmannsretten';

export const UNIT: Record<Keys, Translation> = {
  vedtaksinstans: {
    [Languages.NB]: 'Nav vedtaksinstans',
    [Languages.NN]: 'Nav vedtaksinstans',
    [Languages.EN]: 'Nav Decision-making Unit (Nav vedtaksinstans)',
  },
  klageinstans: {
    [Languages.NB]: 'Nav klageinstans',
    [Languages.NN]: 'Nav klageinstans',
    [Languages.EN]: 'Nav Complaints Unit (Nav klageinstans)',
  },
  trygderetten: {
    [Languages.NB]: 'Trygderetten',
    [Languages.NN]: 'Trygderetten',
    [Languages.EN]: 'National Insurance Court (Trygderetten)',
  },
  trygderettens: {
    [Languages.NB]: 'Trygderettens',
    [Languages.NN]: 'Trygderettens',
    [Languages.EN]: "National Insurance Court's (Trygderetten's)",
  },
  lagmannsretten: {
    [Languages.NB]: 'Lagmannsretten',
    [Languages.NN]: 'Lagmannsretten',
    [Languages.EN]: 'Court of Appeal (Lagmannsretten)',
  },
};
