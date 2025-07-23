import { headers } from 'next/headers';
import { InternalServerError, UnauthorizedError } from '@/lib/errors';
import { getSaker } from '@/lib/server/api';
import { getDecoratorLanguage } from '@/lib/server/get-language';
import type { Translation } from '@/locales';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const saker = await getSaker(await headers());

    return Response.json(saker);
  } catch (error) {
    if (error instanceof UnauthorizedError) {
      return new Response(error.message, { status: 401 });
    }

    if (error instanceof InternalServerError) {
      return new Response(error.message, { status: 500 });
    }

    const lang = await getDecoratorLanguage();

    return new Response(UNKNOWN_ERROR[lang], { status: 500 });
  }
}

const UNKNOWN_ERROR: Translation = {
  nb: 'Ukjent feil',
  nn: 'Ukjend feil',
  en: 'Unknown error',
};
