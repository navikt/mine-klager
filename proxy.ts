import { getToken, validateToken } from '@navikt/oasis';
import { type NextRequest, NextResponse } from 'next/server';
import { isLocal } from '@/lib/environment';
import { getLogger } from '@/lib/logger';
import { CURRENT_PATH_HEADER, DECORATOR_LANGUAGE_COOKIE, LANGUAGE_HEADER } from '@/lib/server/custom-headers';
import { DEFAULT_LANGUAGE, isLanguage } from '@/locales';

const logger = getLogger('proxy');

export async function proxy(request: NextRequest) {
  const authResponse = await getAuthResponse(request);

  if (authResponse !== null) {
    return authResponse;
  }

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

/**
 * Returns a response if the request must not reach the app, otherwise `null`.
 * Only missing and expired tokens go to login. Logging in is unlikely to fix other errors, and could cause a login loop.
 */
const getAuthResponse = async (request: NextRequest): Promise<NextResponse | null> => {
  // Locally, there is no Wonderwall to provide a token.
  if (isLocal) {
    return null;
  }

  const path = request.nextUrl.pathname;
  const token = getToken(request.headers);

  if (token === null) {
    logger.warn('Missing token', { path });

    return getLoginResponse(request);
  }

  const validation = await validateToken(token);

  if (validation.ok) {
    return null;
  }

  if (validation.errorType === 'token expired') {
    logger.info('Expired token', { path });

    return getLoginResponse(request);
  }

  // Wonderwall has passed an invalid token to this app. Not expired, invalid.
  // This should never happen. Even expired tokens are "valid".
  logger.error('Invalid token', { path, error: validation.error.message });

  return new NextResponse(null, { status: 500 });
};

/**
 * Same as Wonderwall: redirect page navigations to login, and respond with 401 to other requests.
 * Redirecting a client side fetch, like an RSC request, to the login provider would fail on CORS.
 */
const getLoginResponse = (request: NextRequest): NextResponse => {
  if (!isNavigationRequest(request)) {
    return new NextResponse(null, { status: 401 });
  }

  // Next requires an absolute URL, but sends it as a relative `location` header when the host matches the request.
  // https://nextjs.org/docs/messages/proxy-relative-urls
  const loginUrl = new URL('/oauth2/login', request.nextUrl);

  loginUrl.search = new URLSearchParams({ redirect: request.nextUrl.pathname + request.nextUrl.search }).toString();

  return NextResponse.redirect(loginUrl, 302);
};

/**
 * Port of Wonderwall's `IsNavigationRequest`, falling back to the `Accept` header without fetch metadata.
 * https://github.com/nais/wonderwall/blob/3e446ead3f77d4db28620279ba0f2a2664e3d228/internal/http/request.go
 */
const isNavigationRequest = (request: NextRequest): boolean => {
  if (request.method !== 'GET') {
    return false;
  }

  const mode = request.headers.get('sec-fetch-mode') ?? '';
  const dest = request.headers.get('sec-fetch-dest') ?? '';

  if (mode === '' && dest === '') {
    return acceptsHtml(request);
  }

  return mode === 'navigate' && dest === 'document';
};

const acceptsHtml = (request: NextRequest): boolean => {
  const accept = request.headers.get('accept') ?? '';

  return accept.split(',').some((value) => value.split(';')[0]?.trim().toLowerCase() === 'text/html');
};
