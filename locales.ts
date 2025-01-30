export type Translation<T = string> = Record<Language, T>;

export enum Language {
  NB = 'nb',
  NN = 'nn',
  EN = 'en',
}

export const LANGUAGES = Object.values(Language);

export const DEFAULT_LANGUAGE = Language.NB;
export const NON_DEFAULT_LANGUAGES = LANGUAGES.filter((lang) => lang !== DEFAULT_LANGUAGE);

export const isLanguage = (value: string | null): value is Language => LANGUAGES.includes(value as Language);
