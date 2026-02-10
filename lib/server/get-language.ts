import type { ReadonlyHeaders } from 'next/dist/server/web/spec-extension/adapters/headers';
import { headers } from 'next/headers';
import { LANGUAGE_HEADER } from '@/lib/server/custom-headers';
import { DEFAULT_LANGUAGE, isLanguage, type Language } from '@/locales';

export interface LanguageParams {
  lang: string;
}

interface ResolvedLang {
  lang: Language;
}

export const resolveLanguageParams = async <T extends LanguageParams>(
  params: Promise<T>,
): Promise<Omit<T, 'lang'> & ResolvedLang> => {
  const { lang, ...rest } = await params;

  return {
    ...rest,
    lang: isLanguage(lang) ? lang : DEFAULT_LANGUAGE,
  };
};

export const getLanguage = async (params: Promise<LanguageParams>): Promise<Language> => {
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
