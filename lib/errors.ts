import { Language, type Translation } from '@/locales';

export class UnauthorizedError extends Error {
  constructor(lang: Language) {
    super(LOGGED_OUT_MESSAGE[lang]);
  }
}

const LOGGED_OUT_MESSAGE: Translation = {
  [Language.NB]: 'Du er logget ut.',
  [Language.NN]: 'Du er logga ut.',
  [Language.EN]: 'You are logged out.',
};

export class InternalServerError extends Error {
  public status: number | string;

  constructor(status: number | string, message: string, lang: Language, options?: { cause?: Error }) {
    super(`${INTERNAL_SERVER_ERROR_MESSAGE[lang]} (${status}) - ${message}`, options);
    this.status = status;
  }
}

const INTERNAL_SERVER_ERROR_MESSAGE: Translation = {
  [Language.NB]: 'Noe gikk galt.',
  [Language.NN]: 'Noko gjekk gale.',
  [Language.EN]: 'Something went wrong.',
};
