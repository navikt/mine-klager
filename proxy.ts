import { type NextRequest, NextResponse } from 'next/server';
import { CURRENT_PATH_HEADER, DECORATOR_LANGUAGE_COOKIE, LANGUAGE_HEADER } from '@/lib/server/custom-headers';
import { DEFAULT_LANGUAGE, isLanguage } from '@/locales';

export function proxy(request: NextRequest) {
  // Copy the incoming headers, since `request.headers` replaces them all.
  const headers = new Headers(request.headers);

  headers.set(CURRENT_PATH_HEADER, request.nextUrl.pathname);

  const lang = request.cookies.get(DECORATOR_LANGUAGE_COOKIE);

  headers.set(LANGUAGE_HEADER, lang !== undefined && isLanguage(lang.value) ? lang.value : DEFAULT_LANGUAGE);

  return NextResponse.next({ request: { headers } });
}

// Skip routes that never render a page, so they do not need the headers. Unknown paths still need them for the not found page.
export const config = {
  matcher: ['/((?!_next/|isAlive$|isReady$|metrics$|api/logger$).*)'],
};
