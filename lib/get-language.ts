import { LANGUAGE_HEADER } from '@/lib/custom-headers';
import { DEFAULT_LANGUAGE, type Languages, isLanguage } from '@/locales';
import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import { headers } from 'next/headers';

export const getLanguage = async (params: Promise<{ lang: DecoratorLocale }>): Promise<Languages> => {
  const { lang } = await params;

  if (isLanguage(lang)) {
    return lang;
  }

  return DEFAULT_LANGUAGE;
};

export const getDecoratorLanguage = async (): Promise<Languages> => {
  const headerList = await headers();
  const decoratorLocale = headerList.get(LANGUAGE_HEADER);

  if (decoratorLocale !== null && isLanguage(decoratorLocale)) {
    return decoratorLocale;
  }

  return DEFAULT_LANGUAGE;
};
