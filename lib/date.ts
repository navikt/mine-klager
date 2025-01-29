import { Language, type Translation } from '@/locales';
import type { Locale } from 'date-fns';
import { format as _format, intlFormat } from 'date-fns';
import { enGB, nb, nn } from 'date-fns/locale';

export const PRETTY_DATETIME_FORMAT = 'dd. MMM yyyy HH:mm:ss';
export const PRETTY_DATE_FORMAT = 'dd. MMM yyyy';
export const ISO_FORMAT = 'yyyy-MM-ddTHH:mm:ss';

export const LOCALES: Record<Language, Locale> = {
  [Language.NB]: nb,
  [Language.NN]: nn,
  [Language.EN]: enGB,
};

export const format = (date: Date, format: string, lang: Language) => _format(date, format, { locale: LOCALES[lang] });

export const INTL_LOCALES: Translation = {
  [Language.NB]: 'nb-NO',
  [Language.NN]: 'nn-NO',
  [Language.EN]: 'en-GB',
};

export const longFormat = (date: Date, lang: Language) =>
  intlFormat(
    date,
    { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit' },
    { locale: INTL_LOCALES[lang] },
  );
