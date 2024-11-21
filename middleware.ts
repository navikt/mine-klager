import {} from '@navikt/oasis';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// biome-ignore lint/suspicious/noConsoleLog: <explanation>
console.log('middleware');

export function middleware(request: NextRequest) {
  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('middleware', request.nextUrl.pathname);

  // const { pathname } = request.nextUrl;
  // const lang = pathname.split('/').at(1);

  // // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  // console.log('lang', JSON.stringify(lang));

  // if (lang !== undefined && lang.length > 0 && !isLanguage(lang)) {
  //   // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  //   console.log('redirect', `http://localhost:3000${pathname}`);

  //   return NextResponse.redirect(`http://localhost:3000${pathname}`);
  // }

  // if (request.headers.get('Authorization') === null || request.headers.get('Authorization')?.length === 0) {
  //   return getLoginResponse(request);
  // }

  // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  console.log('headers:', request.headers);

  // try {
  //   const token = await getToken(request);

  //   // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  //   console.log('token', token);

  //   if (token === null) {
  //     return getLoginResponse(request);
  //   }

  //   const validation = await validateIdportenToken(token);

  //   if (!validation.ok) {
  //     return getLoginResponse(request);
  //   }

  //   const obo = await requestOboToken(token, 'kling-api');

  //   if (!obo.ok) {
  //     return getLoginResponse(request);
  //   }
  // } catch (error) {
  //   // biome-ignore lint/suspicious/noConsoleLog: <explanation>
  //   console.error('middleware error:', error);
  //   return getLoginResponse(request);
  // }
}

const _getLoginResponse = (req: NextRequest) =>
  NextResponse.redirect(`${req.nextUrl.protocol}//${req.nextUrl.host}/oauth2/login?redirect=${req.nextUrl.pathname}`);

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
    '/',
  ],
};
