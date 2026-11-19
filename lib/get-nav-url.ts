import { isDeployedToProd } from '@/lib/environment';
import { Language } from '@/locales';

const NAV_DOMAIN = isDeployedToProd ? 'https://www.nav.no' : 'https://www.ansatt.dev.nav.no';

export const getNavUrl = (path: string, lang: Language): string => {
  const language = lang === Language.NB ? '' : `/${lang}`;

  return `${NAV_DOMAIN}/${path}${language}`;
};
