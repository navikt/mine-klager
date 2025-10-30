'use client';

import { onLanguageSelect, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import { configureLogger } from '@navikt/next-logger';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { browserLog } from '@/lib/browser-log';
import { INSTANS } from '@/lib/dictionary';
import { DEFAULT_LANGUAGE, isLanguage, Language, type Translation } from '@/locales';

configureLogger({
  apiPath: '/api/logger',
});

interface BreadcrumbsProps {
  lang: DecoratorLocale;
  breadcrumbs?: { title: string; url: string }[];
  path?: string;
}

const TITLE: Translation = {
  [Language.NB]: `Mine saker hos ${INSTANS.klageinstans.nb}`,
  [Language.NN]: `Mine saker hos ${INSTANS.klageinstans.nn}`,
  [Language.EN]: `My cases with ${INSTANS.klageinstans.en}`,
};

export const DecoratorUpdater = ({ lang, breadcrumbs = [], path }: BreadcrumbsProps) => {
  const router = useRouter();

  useEffect(() => {
    setBreadcrumbs([
      {
        title: isLanguage(lang) ? TITLE[lang] : TITLE[DEFAULT_LANGUAGE],
        url: lang === DEFAULT_LANGUAGE ? '/' : `/${lang}`,
      },
      ...breadcrumbs,
    ]);

    onLanguageSelect((language) => {
      browserLog.info('onLanguageSelect', language);

      if (language.locale === DEFAULT_LANGUAGE) {
        router.push(path ?? '/');
      } else {
        router.push(`/${language.locale}${path ?? ''}`);
      }
    });
  }, [lang, router, breadcrumbs, path]);

  return null;
};
