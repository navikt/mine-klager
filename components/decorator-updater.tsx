'use client';

import { browserLog } from '@/lib/browser-log';
import { UNIT } from '@/lib/dictionary';
import { DEFAULT_LANGUAGE, Languages, type Translation, isLanguage } from '@/locales';
import { onLanguageSelect, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import { configureLogger } from '@navikt/next-logger';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

configureLogger({
  apiPath: '/api/logger',
});

interface BreadcrumbsProps {
  lang: DecoratorLocale;
  breadcrumbs?: { title: string; url: string }[];
  path?: string;
}

const TITLE: Translation = {
  [Languages.NB]: `Mine klager og anker hos ${UNIT.klageinstans.nb}`,
  [Languages.NN]: `Mine klagar og ankar hos ${UNIT.klageinstans.nn}`,
  [Languages.EN]: `My complaints and appeals with ${UNIT.klageinstans.en}`,
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
