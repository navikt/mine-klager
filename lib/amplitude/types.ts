import type { Language } from '@/locales';

export type EventData = Record<string, string | number | boolean | undefined | null>;

export interface AmplitudeContextData {
  lang?: Language;
  path?: string;
  page?: string;
  ytelse?: string;
  type?: string;
}
