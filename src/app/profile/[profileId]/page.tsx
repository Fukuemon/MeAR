import { cookies } from 'next/headers'
import { checkLoginUser } from '@/app/(auth)/lib/checkLoginUser'
import { Profile } from './Profile'

export default async function ProfileDetail({ params }: { params: { profileId: string } }) {
  const { profileId } = params
  let isLoginUser: boolean | undefined

  const cookiesStore = cookies()
  const accessToken = cookiesStore.get('access')?.value
  if (accessToken) {
    isLoginUser = await checkLoginUser(profileId, accessToken)
  }

  return (
    <div>
      <Profile profileId={profileId} isLoginUser={isLoginUser} />
    </div>
  )
}
