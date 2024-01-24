import { BottomNavbarContainer } from '@/app/_components/Common/BottomNavbar'
import { Profile } from './Profile'

export default async function ProfileDetail({ params }: { params: { profileId: string } }) {
  const { profileId } = params
  return (
    <div>
      <Profile profileId={profileId} />
      <BottomNavbarContainer />
    </div>
  )
}
