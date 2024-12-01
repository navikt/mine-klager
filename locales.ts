export enum Languages {
  NB = 'nb',
  NN = 'nn',
  EN = 'en',
}

export const LANGUAGES = Object.values(Languages);

export const DEFAULT_LANGUAGE = Languages.NB;
export const NON_DEFAULT_LANGUAGES = LANGUAGES.filter((lang) => lang !== DEFAULT_LANGUAGE);

export const isLanguage = (value: string): value is Languages => LANGUAGES.includes(value as Languages);
