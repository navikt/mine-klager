import { Language, type Translation } from '@/locales';

const OR_BY_LANGUAGE: Translation = {
  [Language.NB]: 'eller',
  [Language.NN]: 'eller',
  [Language.EN]: 'or',
};

const addQuotes = (text: string): string => `«${text}»`;

export const formatInnsendingsytelser = (innsendingsytelser: string[], lang: Language): string => {
  if (innsendingsytelser.length === 0) {
    return '';
  }

  const quotedYtelser = innsendingsytelser.map(addQuotes);

  if (quotedYtelser.length === 1) {
    return quotedYtelser.join('');
  }

  const or = OR_BY_LANGUAGE[lang];

  if (quotedYtelser.length === 2) {
    return quotedYtelser.join(` ${or} `);
  }

  const leadingItems = quotedYtelser.slice(0, -1).join(', ');
  const lastItem = quotedYtelser.slice(-1).join('');

  return `${leadingItems} ${or} ${lastItem}`;
};
