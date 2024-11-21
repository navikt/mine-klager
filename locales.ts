export enum Languages {
  NB = 'nb',
  NN = 'nn',
  EN = 'en',
}

export const DEFAULT_LANGUAGE = Languages.NB;

export const LANGUAGES = Object.values(Languages);

export const isLanguage = (value: string): value is Languages => LANGUAGES.includes(value as Languages);
