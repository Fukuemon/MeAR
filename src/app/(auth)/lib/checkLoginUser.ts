import { getCookie, setCookie } from 'cookies-next'
import { getMyProfile } from '@/app/profile/lib/getMyProfile'
import { verifyAccessToken } from './verifyAccessToken'

// ログインユーザーのIDを取得し、クッキーに保存する関数
export async function checkLoginUser(id: string, accessToken?: string) {
  let loginUserId = getCookie('loginUserId')
  if (!loginUserId && accessToken) {
    const isLogin = await verifyAccessToken(accessToken)
    if (isLogin) {
      const loginProfile = await getMyProfile(accessToken)
      loginUserId = loginProfile.id.toString()
      setCookie('loginUserId', loginUserId, { maxAge: 60 * 45 })
    }
  }

  const isLoginUser = loginUserId == id
  return isLoginUser
}
