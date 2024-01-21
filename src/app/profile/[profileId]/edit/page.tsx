import { notFound } from 'next/navigation'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import { EditProfileType } from '@/types/Profile/types'
import { getProfileById } from '../../lib/getProfileById'
import { EditProfile } from './_components/EditProfile'

export default async function ProfileEditPage({ params }: { params: { profileId: string } }) {
  const { profileId } = params
  // const cookiesStore = cookies()
  // const accessToken = cookiesStore.get('accessToken')?.value
  if (!profileId) return notFound()
  const profiles = await getProfileById(profileId)
  if (!profiles) return notFound()

  const editProfiles: EditProfileType = {
    id: profiles.id,
    username: profiles.username,
    img: profiles.img
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
