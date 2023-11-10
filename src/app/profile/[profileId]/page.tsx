import { notFound } from 'next/navigation'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import ProfileHeader from '../_components/Header'
import PostTabs from '../_components/PostTabs'
import { getPostByLiked } from '../lib/getPostByLiked'
import { getPostByProfileId } from '../lib/getPostByProfileId'
import { getProfileById } from '../lib/getProfileById'
import { getProfileList } from '../lib/getProfileList'

export const generateStaticParams = async () => {
  const profile = await getProfileList()

  return profile.map((profile) => ({
    profileId: profile.id.toString()
  }))
}

export default async function ProfileDetail({ params }: { params: { profileId: string } }) {
  const { profileId } = params

  const profile = await getProfileById(profileId)
  const posts = await getPostByProfileId(profileId)
  const liked_posts = await getPostByLiked(profileId)
  const posts_count = posts?.length

  if (!profile) {
    notFound()
  }

  return (
    <div>
      <BackNavbar name={profile?.username} />
      <ProfileHeader post_count={posts_count} profile={profile} />
      <PostTabs posts={posts} liked_posts={liked_posts} />
    </div>
  )
}
