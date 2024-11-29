import { CURRENT_PATH_HEADER } from '@/lib/custom-headers';
import { type NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const headers = new Headers(request.headers);

  headers.set(CURRENT_PATH_HEADER, request.nextUrl.pathname);

  return NextResponse.next({ headers });
}
