'use client';

import { DEFAULT_LANGUAGE, Languages, isLanguage } from '@/locales';
import { onLanguageSelect, setBreadcrumbs } from '@navikt/nav-dekoratoren-moduler';
import type { DecoratorLocale } from '@navikt/nav-dekoratoren-moduler/ssr';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

interface BreadcrumbsProps {
  lang: DecoratorLocale;
  breadcrumbs?: { title: string; url: string }[];
  path?: string;
}

const TITLE: Record<Languages, string> = {
  [Languages.NB]: 'Mine klager og anker',
  [Languages.NN]: 'Mine klagar og ankar',
  [Languages.EN]: 'My complaints and appeals',
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
      if (language.locale === DEFAULT_LANGUAGE) {
        router.push(path ?? '/');
      } else {
        router.push(`/${language.locale}${path ?? ''}`);
      }
    });
  }, [lang, router, breadcrumbs, path]);

  return null;
};
