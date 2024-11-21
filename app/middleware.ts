import { isLanguage } from '@/locales';
import { getToken, requestOboToken, validateIdportenToken } from '@navikt/oasis';
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export async function middleware(request: NextRequest) {
  console.log('middleware');

  const { pathname } = request.nextUrl;
  const lang = pathname.split('/').at(1);

  if (lang !== undefined && !isLanguage(lang)) {
    return NextResponse.redirect(`/${pathname}`);
  }

  const token = getToken(request);

  if (token === null) {
    return getLoginResponse(pathname);
  }

  const validation = await validateIdportenToken(token);

  if (!validation.ok) {
    return getLoginResponse(pathname);
  }

  const obo = await requestOboToken(token, 'an:example:audience');

  if (!obo.ok) {
    return getLoginResponse(pathname);
  }
}

const getLoginResponse = (pathname: string) => NextResponse.redirect(`/oauth2/login?redirect=${pathname}`);

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/ (API routes)
     * - _next/static/ (static files)
     * - _next/image/ (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    // '/((?!api/|_next/static/|_next/image/|favicon.ico|sitemap.xml|robots.txt).*)',
    '.*',
  ],
};
