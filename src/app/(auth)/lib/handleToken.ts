import { getCookie, setCookie } from 'cookies-next'
import { getRefreshAccessToken } from './getRefreshAccessToken'
import { verifyAccessToken } from './verifyAccessToken'

export async function handleToken() {
  const accessToken = getCookie('access')
  const refreshToken = getCookie('refresh')
  // accessTokenがない場合は、refreshTokenを使って新しいaccessTokenを取得する
  if (!accessToken && refreshToken) {
    const tokens = await getRefreshAccessToken(refreshToken)
    const newAccessToken = tokens.access
    const newRefreshToken = tokens.refresh
    console.log('newAccessToken', newAccessToken)

    if (newAccessToken && newRefreshToken) {
      setCookie('access', newAccessToken, { maxAge: 60 * 45 })
      setCookie('refresh', newRefreshToken, { maxAge: 60 * 60 * 24 * 30 })
      return true
    } else {
      return false
    }
  }
  // accessTokenがあり、検証できた場合は、そのままNextResponse.next()を返す
  if (accessToken && (await verifyAccessToken(accessToken))) {
    return true
  }
  // どちらもない場合は、ログイン画面にリダイレクトする
  if (!accessToken && !refreshToken) {
    return false
  }
}
