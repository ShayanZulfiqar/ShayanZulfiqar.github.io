import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('token')?.value;
  const path = request.nextUrl.pathname;

  // Public paths that don't require authentication
  const publicPaths = [
    '/auth/login',
    '/auth/signup',
    '/auth/verify-email',
    '/auth/forgot-password',
    '/auth/verify-password-otp',
    '/auth/reset-password',
    '/auth/superadmin-login',
    '/home',
    '/',
  ];

  // Check if the path is public
  const isPublicPath = publicPaths.some(publicPath => path.startsWith(publicPath));

  // Redirect to login if trying to access protected route without token
  if (!isPublicPath && !token) {
    return NextResponse.redirect(new URL('/auth/login', request.url));
  }

  // Redirect to home if trying to access auth pages with valid token
  if (isPublicPath && token && path.startsWith('/auth/')) {
    return NextResponse.redirect(new URL('/home', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
