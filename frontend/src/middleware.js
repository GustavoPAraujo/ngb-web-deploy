import { NextResponse } from 'next/server';

export default function middleware(req) {
  const token = req.cookies.get('jwt');

  const publicRoutes = ['/auth/login', '/auth/signup'];

  if (publicRoutes.includes(req.nextUrl.pathname)) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL('/auth/login', req.url));
  }
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)'],
};
