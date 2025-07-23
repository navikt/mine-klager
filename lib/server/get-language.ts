import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { headers } from 'next/headers';
import { LANGUAGE_HEADER } from '@/lib/server/custom-headers';
import { DEFAULT_LANGUAGE, isLanguage, type Language } from '@/locales';

interface Params {
  lang: DecoratorLocale;
}

export const getLanguage = async (params: Promise<Params>): Promise<Language> => {
  const { lang } = await params;

  if (isLanguage(lang)) {
    return lang;
  }

  return DEFAULT_LANGUAGE;
};

export const getDecoratorLanguage = async (): Promise<Language> => {
  const headerList = await headers();
  const decoratorLocale = headerList.get(LANGUAGE_HEADER);

  if (decoratorLocale !== null && isLanguage(decoratorLocale)) {
    return decoratorLocale;
  }

  return DEFAULT_LANGUAGE;
};

export const getLanguageFromHeaders = (headers: ReadonlyHeaders): Language => {
  const langHeader = headers.get(LANGUAGE_HEADER);

  return isLanguage(langHeader) ? langHeader : DEFAULT_LANGUAGE;
};
