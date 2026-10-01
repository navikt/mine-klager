import { Language, type Translation } from '@/locales';

export class InternalServerError extends Error {
  public status: number;

  constructor(status: number, message: string, lang: Language, options?: { cause?: Error }) {
    super(`${INTERNAL_SERVER_ERROR_MESSAGE[lang]} (${status}) - ${message}`, options);
    this.status = status;
  }
}

const INTERNAL_SERVER_ERROR_MESSAGE: Translation = {
  [Language.NB]: 'Noe gikk galt.',
  [Language.NN]: 'Noko gjekk gale.',
  [Language.EN]: 'Something went wrong.',
};
