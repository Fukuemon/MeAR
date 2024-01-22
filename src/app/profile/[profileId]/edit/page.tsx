'use client'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import Loading from '@/app/loading'
import { EditProfileType } from '@/types/Profile/types'
import { useGetProfileById } from '../../hooks/useGetProfileById'
import { EditProfile } from './_components/EditProfile'

export default function ProfileEditPage({ params }: { params: { profileId: string } }) {
  const { profileId } = params
  // const cookiesStore = cookies()
  // const accessToken = cookiesStore.get('accessToken')?.value
  const { profile } = useGetProfileById(profileId)
  if (!profile) return <Loading />

  const editProfiles: EditProfileType = {
    id: profile.id,
    username: profile.username,
    img: profile.img
  }

  return (
    <div>
      <BackNavbar name="プロフィール編集" />
      <div className="mt-10 flex h-screen w-screen items-start justify-center">
        <div className="">
          <EditProfile profile={editProfiles} />
        </div>
      </div>
    </div>
  )
}
