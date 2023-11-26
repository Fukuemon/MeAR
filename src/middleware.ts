// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getRefreshAccessToken } from './app/(auth)/lib/getRefreshAccessToken'
import { verifyAccessToken } from './app/(auth)/lib/verifyAccessToken'

async function handleToken(request: NextRequest, accessToken: string | undefined, refreshToken: string | undefined) {
  try {
    let newAccessToken = accessToken && (await verifyAccessToken(accessToken))

    if (!newAccessToken && refreshToken) {
      newAccessToken = await getRefreshAccessToken(refreshToken)
    }

    if (newAccessToken) {
      const response = await NextResponse.next()
      response.cookies.set('access', newAccessToken, { maxAge: 60 * 45 }) // Set new access token with the same maxAge
      return response
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  } catch (err) {
    console.error(err)
    request.cookies.delete('access')
    request.cookies.delete('refresh')
  }
}

export async function middleware(request: NextRequest) {
  const refreshToken = await request.cookies.get('refresh')?.value
  const accessToken = await request.cookies.get('access')?.value
  const loginUserId = await request.cookies.get('loginUserId')?.value

  if (request.nextUrl.pathname.startsWith('/login')) {
    request.cookies.delete('access')
    request.cookies.delete('refresh')
  }

  if (loginUserId && request.nextUrl.pathname.startsWith(`/profile/${loginUserId}`)) {
    return handleToken(request, accessToken, refreshToken)
  }

  // その他のルートの場合
  return handleToken(request, accessToken, refreshToken)
}

export const config = {
  matcher: ['/post/create/:path*', '/shop/search/:path*']
}
