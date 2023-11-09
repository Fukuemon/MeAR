import { FC } from 'react'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import { PostList } from '@/types/Post/types'
import { ProfileType } from '@/types/Profile/types'
import ProfileHeader from '../Header'
import PostTabs from '../PostTabs'

type ProfileProps = {
  profile: ProfileType
  posts?: PostList
  liked_posts?: PostList
  posts_count?: number
}

const Profile: FC<ProfileProps> = ({ profile, posts, posts_count, liked_posts }) => {
  return (
    <div>
      <BackNavbar name={profile?.username} />
      <ProfileHeader post_count={posts_count} profile={profile} />
      <PostTabs posts={posts} liked_posts={liked_posts} />
    </div>
  )
}

export default Profile
