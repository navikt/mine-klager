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

  return { ...rest, lang: toLanguage(lang) };
};

export const getLanguage = async (params: Promise<LanguageParams>): Promise<Language> => {
  const { lang } = await params;

  return toLanguage(lang);
};

/**
 * Language from the decorator language cookie, forwarded as a header by `proxy.ts`.
 * For code without access to the `[lang]` segment, like route handlers and `not-found.tsx`.
 */
export const getLanguageFromHeaders = (headers: Headers): Language => toLanguage(headers.get(LANGUAGE_HEADER));

const toLanguage = (lang: string | null): Language => (isLanguage(lang) ? lang : DEFAULT_LANGUAGE);
