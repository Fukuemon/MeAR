// middleware.ts
// import { NextResponse } from 'next/server'
import { NextRequest } from 'next/server'
// import { getRefreshAccessToken } from './app/(auth)/lib/getRefreshAccessToken'
// import { verifyAccessToken } from './app/(auth)/lib/verifyAccessToken'
// import { toast } from './components/ui/use-toast'

// async function handleToken(request: NextRequest, accessToken: string | undefined, refreshToken: string | undefined) {
//   // accessTokenがない場合は、refreshTokenを使って新しいaccessTokenを取得する
//   if (!accessToken && refreshToken) {
//     const tokens = await getRefreshAccessToken(refreshToken)
//     const newAccessToken = tokens.access
//     const newRefreshToken = tokens.refresh

//     if (newAccessToken && newRefreshToken) {
//       const response = NextResponse.next()
//       response.cookies.set('access', newAccessToken, { maxAge: 60 * 45 })
//       response.cookies.set('refresh', newRefreshToken, { maxAge: 60 * 60 * 24 * 30 })
//       return response
//     } else {
//       toast({ title: 'ログインしてください' })
//       return NextResponse.redirect(new URL('/login/confirm', request.url))
//     }
//   }
//   // accessTokenがあり、検証できた場合は、そのままNextResponse.next()を返す
//   if (accessToken && (await verifyAccessToken(accessToken))) {
//     return NextResponse.next()
//   }
//   // どちらもない場合は、ログイン画面にリダイレクトする
//   if (!accessToken && !refreshToken) {
//     toast({ title: 'ログインしてください' })
//     return NextResponse.redirect(new URL('/login/confirm', request.url))
//   }
// }

export async function middleware(request: NextRequest) {
  // const refreshToken = request.cookies.get('refresh')?.value
  // const accessToken = request.cookies.get('access')?.value
  // const loginUserId = request.cookies.get('loginUserId')?.value

  if (request.nextUrl.pathname.startsWith('/login')) {
    await request.cookies.delete('access')
    await request.cookies.delete('refresh')
    await request.cookies.delete('loginUserId')
  }

  if (request.nextUrl.pathname.startsWith('/login/confirm')) {
    await request.cookies.delete('access')
    await request.cookies.delete('refresh')
    await request.cookies.delete('loginUserId')
  }

  // if (loginUserId && request.nextUrl.pathname.startsWith(`/profile/${loginUserId}`)) {
  //   return await handleToken(request, accessToken, refreshToken)
  // }

  // // その他のルートの場合
  // return await handleToken(request, accessToken, refreshToken)
}

export const config = {
  matcher: ['/post/create/:path*', '/shop/search/:path*']
}
