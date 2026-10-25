import { NextRequest, NextResponse } from 'next/server';
import { verifyToken, COOKIE_NAME } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const token = request.cookies.get(COOKIE_NAME)?.value;
  const { pathname } = request.nextUrl;

  const isLoginPage = pathname === '/login';
  const isLoginApi = pathname.startsWith('/api/login');
  const isLogoutApi = pathname.startsWith('/api/logout');
  const isAuthApi = isLoginApi || isLogoutApi;

  const authenticated = await verifyToken(token);

  if (isLoginPage && authenticated) {
    return NextResponse.redirect(new URL('/admin/orders', request.url));
  }

  if (isLoginPage || isAuthApi) {
    return NextResponse.next();
  }

  if (!authenticated) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*', '/login'],
};
