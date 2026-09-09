import type { Locale } from 'date-fns';
import { format as dateFnsformat } from 'date-fns';
import { enGB, nb, nn } from 'date-fns/locale';
import { Language, type Translation } from '@/locales';

export const ISO_DATETIME_FORMAT = 'yyyy-MM-ddTHH:mm:ss';
export const ISO_DATE_FORMAT = 'yyyy-MM-dd';

const LOCALES: Record<Language, Locale> = {
  [Language.NB]: nb,
  [Language.NN]: nn,
  [Language.EN]: enGB,
};

export const format = (date: Date, format: string, lang: Language) =>
  dateFnsformat(date, format, { locale: LOCALES[lang] });

const FULL_DATETIME: Intl.DateTimeFormatOptions = {
  weekday: 'long',
  day: 'numeric',
  month: 'long',
  year: 'numeric',
  hour: '2-digit',
  minute: '2-digit',
};

const FULL_DATETIME_FORMATS: Translation<Intl.DateTimeFormat> = {
  [Language.NB]: new Intl.DateTimeFormat('no', FULL_DATETIME),
  [Language.NN]: new Intl.DateTimeFormat('no', FULL_DATETIME), // The specific locales for nynorsk (nn-NO and nno) end up as English in Chrome. They work in Firefox.
  [Language.EN]: new Intl.DateTimeFormat('en-GB', FULL_DATETIME),
};

export const formatFullDatetime = (date: Date, lang: Language) => FULL_DATETIME_FORMATS[lang].format(date);

const FULL_DATE: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'long',
  year: 'numeric',
};

const FULL_DATE_FORMATS: Translation<Intl.DateTimeFormat> = {
  [Language.NB]: new Intl.DateTimeFormat('no', FULL_DATE),
  [Language.NN]: new Intl.DateTimeFormat('no', FULL_DATE), // The specific locales for nynorsk (nn-NO and nno) end up as English in Chrome. They work in Firefox.
  [Language.EN]: new Intl.DateTimeFormat('en-GB', FULL_DATE),
};

export const formatFullDate = (date: Date, lang: Language) => FULL_DATE_FORMATS[lang].format(date);

const SHORT_DATE: Intl.DateTimeFormatOptions = {
  day: 'numeric',
  month: 'short',
  year: 'numeric',
};

const SHORT_DATE_FORMATS: Translation<Intl.DateTimeFormat> = {
  [Language.NB]: new Intl.DateTimeFormat('no', SHORT_DATE),
  [Language.NN]: new Intl.DateTimeFormat('no', SHORT_DATE), // The specific locales for nynorsk (nn-NO and nno) end up as English in Chrome. They work in Firefox.
  [Language.EN]: new Intl.DateTimeFormat('en-GB', SHORT_DATE),
};

export const formatShortDate = (date: Date, lang: Language) => SHORT_DATE_FORMATS[lang].format(date);
