import { getCookie, setCookie } from 'cookies-next'
import { getMyProfile } from '@/app/profile/lib/getMyProfile'
import { verifyAccessToken } from './verifyAccessToken'

// ログインユーザーのIDを取得し、クッキーに保存する関数
export async function checkLoginUser(id: string, accessToken?: string) {
  // const cookiesStore = cookies()
  let loginUserId = getCookie('loginUserId')
  console.log('loginUserId', loginUserId)
  console.log(accessToken)
  console.log('id', id)

  if (!loginUserId && accessToken) {
    const isLogin = await verifyAccessToken(accessToken)
    console.log('isLogin', isLogin)
    if (isLogin) {
      const loginProfile = await getMyProfile(accessToken)
      loginUserId = loginProfile.id.toString()
      console.log('loginUserId', loginUserId)
      setCookie('loginUserId', loginUserId, { maxAge: 60 * 45 })
    }
  }

  const isLoginUser = loginUserId == id
  console.log('isLoginUser', isLoginUser)
  return isLoginUser
}
