import { NextRequest, NextResponse } from 'next/server'
import { Cryptography } from './lib/Cryptography'

const protectedRoutes = ['/products']
const publicRoutes = ['/login', '/']
const redirectTo = (req: NextRequest, pathname: string) => NextResponse.redirect(new URL(pathname, req.nextUrl))

export default async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route))
  const isPublicRoute = publicRoutes.some(route => path.startsWith(route))

  const cookie = req.cookies.get('session')?.value
  const session = await Cryptography.decrypt(cookie)

  if (isProtectedRoute && !session?.username) {
    return redirectTo(req, '/login')
  }

  if (req.nextUrl.pathname === '/') {
    return redirectTo(req, session?.username ? '/products' : '/login')
  }

  if (
    isPublicRoute &&
    session?.username &&
    !req.nextUrl.pathname.startsWith('/products')
  ) {
    return redirectTo(req, '/products')
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
}