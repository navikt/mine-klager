import { Languages, isLanguage } from '@/locales';
import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';

export const getLanguage = async (params: Promise<{ lang: DecoratorLocale }>): Promise<Languages> => {
  const { lang } = await params;

  if (isLanguage(lang)) {
    return lang;
  }

  return Languages.NB;
};
