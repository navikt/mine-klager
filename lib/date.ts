import type { Locale } from 'date-fns';
import { format as dateFnsformat } from 'date-fns';
import { enGB, nb, nn } from 'date-fns/locale';
import { Language, type Translation } from '@/locales';

export const PRETTY_DATETIME_FORMAT = 'dd. MMM yyyy HH:mm:ss';
export const PRETTY_DATE_FORMAT = 'dd. MMM yyyy';
export const ISO_DATETIME_FORMAT = 'yyyy-MM-ddTHH:mm:ss';
export const ISO_DATE_FORMAT = 'yyyy-MM-dd';

export const LOCALES: Record<Language, Locale> = {
  [Language.NB]: nb,
  [Language.NN]: nn,
  [Language.EN]: enGB,
};

export const format = (date: Date, format: string, lang: Language) =>
  dateFnsformat(date, format, { locale: LOCALES[lang] });

const LONG_FORMAT: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const LONG_FORMATS: Translation<Intl.DateTimeFormat> = {
  [Language.NB]: new Intl.DateTimeFormat('no', LONG_FORMAT),
  [Language.NN]: new Intl.DateTimeFormat('no', LONG_FORMAT), // The specific locales for nynorsk (nn-NO and nno) end up as English in Chrome. They work in Firefox.
  [Language.EN]: new Intl.DateTimeFormat('en-GB', LONG_FORMAT),
};

export const longFormat = (date: Date, lang: Language) => LONG_FORMATS[lang].format(date);

const SHORT_FORMAT: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const SHORT_FORMATS: Translation<Intl.DateTimeFormat> = {
  [Language.NB]: new Intl.DateTimeFormat('no', SHORT_FORMAT),
  [Language.NN]: new Intl.DateTimeFormat('no', SHORT_FORMAT), // The specific locales for nynorsk (nn-NO and nno) end up as English in Chrome. They work in Firefox.
  [Language.EN]: new Intl.DateTimeFormat('en-GB', SHORT_FORMAT),
};

export const textFormat = (date: Date, lang: Language) => SHORT_FORMATS[lang].format(date);
