import type { Language, Translation } from '@/locales';
import { unauthorized } from 'next/navigation';

export const validateResponse = async (res: Response, lang: Language, message: Translation) => {
  if (!res.ok) {
    if (res.status === 401) {
      unauthorized();
    }

    if (res.status === 500) {
      return new Response(await res.text(), { status: res.status, headers: res.headers });
    }

    throw new Error(`${res.status} - ${message[lang]}: ${res.text()}`);
  }
};
