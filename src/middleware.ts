// middleware.ts
import { cookies } from 'next/headers' // Next.jsのcookies関数を使用
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getRefreshAccessToken } from './app/(auth)/lib/getRefreshAccessToken'

export async function middleware(request: NextRequest) {
  const cookieStore = cookies()
  const accessToken = cookieStore.get('access')?.value
  const refreshToken = cookieStore.get('refresh')?.value

  if (request.nextUrl.pathname.startsWith('/login')) {
    request.cookies.delete('access')
    request.cookies.delete('refresh')
  }

  if (accessToken) {
    // Token is valid
    return NextResponse.next()
  } else {
    if (refreshToken) {
      // Token is invalid, but refresh token is valid
      const newAccessToken = await getRefreshAccessToken(refreshToken)
      const response = await NextResponse.next()
      response.cookies.set('access', newAccessToken, { maxAge: 60 * 45 }) // Set new access token with the same maxAge
      return response
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
}

export const config = {
  matcher: ['/profile/:path*', '/post/create/:path*', '/shop/search/:path*']
}
