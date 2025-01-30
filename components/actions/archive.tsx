import { ButtonLink } from '@/components/button-link';
import { isDeployedToProd } from '@/lib/environment';
import { DEFAULT_LANGUAGE, type Language, type Translation } from '@/locales';

interface ArchiveLinkProps {
  lang: Language;
}

export const ArchiveLink = ({ lang }: ArchiveLinkProps) => (
  <ButtonLink variant="secondary" href={getUrl(lang)} openInNewTab>
    {TEXT[lang]}
  </ButtonLink>
);

const BASE_URL = isDeployedToProd ? 'https://www.nav.no/dokumentarkiv' : 'https://www.intern.dev.nav.no/dokumentarkiv';

const getUrl = (lang: Language) => (lang === DEFAULT_LANGUAGE ? BASE_URL : `${BASE_URL}/${lang}`);

const TEXT: Translation = {
  nb: 'Gå til dokumentarkivet',
  nn: 'Gå til dokumentarkivet',
  en: 'Go to the document archive',
};
