import { Languages } from '@/locales';
import type { Locale } from 'date-fns';
import { format as _format } from 'date-fns';
import { enGB, nb, nn } from 'date-fns/locale';

export const PRETTY_DATETIME_FORMAT = `dd. MMM yyyy 'kl.' HH:mm:ss`;
export const PRETTY_DATE_FORMAT = 'dd. MMM yyyy';
export const ISO_FORMAT = 'yyyy-MM-ddTHH:mm:ss';

const LOCALES: Record<Languages, Locale> = {
  [Languages.NB]: nb,
  [Languages.NN]: nn,
  [Languages.EN]: enGB,
};

export const format = (date: Date, format: string, lang: Languages) => _format(date, format, { locale: LOCALES[lang] });
