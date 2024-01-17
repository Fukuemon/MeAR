// middleware.ts
import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
import { getRefreshAccessToken } from './app/(auth)/lib/getRefreshAccessToken'
import { verifyAccessToken } from './app/(auth)/lib/verifyAccessToken'

async function handleToken(request: NextRequest, accessToken: string | undefined, refreshToken: string | undefined) {
  // accessTokenがない場合は、refreshTokenを使って新しいaccessTokenを取得する
  if (!accessToken && refreshToken) {
    const tokens = await getRefreshAccessToken(refreshToken)
    const newAccessToken = await tokens.access
    const newRefreshToken = await tokens.refresh

    if (newAccessToken && newRefreshToken) {
      const response = await NextResponse.next()
      await response.cookies.set('access', newAccessToken, { maxAge: 60 * 45 })
      await response.cookies.set('refresh', newRefreshToken, { maxAge: 60 * 60 * 24 * 30 })
      return response
    } else {
      return NextResponse.redirect(new URL('/login', request.url))
    }
  }
  // accessTokenがあり、検証できた場合は、そのままNextResponse.next()を返す
  if (accessToken && (await verifyAccessToken(accessToken))) {
    return NextResponse.next()
  }
  // どちらもない場合は、ログイン画面にリダイレクトする
  if (!accessToken && !refreshToken) {
    return NextResponse.redirect(new URL('/login', request.url))
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
    return await handleToken(request, accessToken, refreshToken)
  }

  // その他のルートの場合
  return await handleToken(request, accessToken, refreshToken)
}

export const config = {
  matcher: ['/post/create/:path*', '/shop/search/:path*', '/profile/:path*']
}
