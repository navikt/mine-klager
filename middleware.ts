import { CURRENT_PATH_HEADER, DECORATOR_LANGUAGE_COOKIE, LANGUAGE_HEADER } from '@/lib/server/custom-headers';
import { DEFAULT_LANGUAGE, isLanguage } from '@/locales';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const headers = new Headers();

  headers.set(CURRENT_PATH_HEADER, request.nextUrl.pathname);

  const lang = request.cookies.get(DECORATOR_LANGUAGE_COOKIE);

  headers.set(LANGUAGE_HEADER, lang !== undefined && isLanguage(lang.value) ? lang.value : DEFAULT_LANGUAGE);

  return NextResponse.next({ headers });
}
