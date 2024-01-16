import { Suspense } from 'react'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import Loading from '@/app/loading'
import ProfileHeader from '../_components/Header'
import PostTabs from '../_components/PostTabs'
import { getPostByLiked } from '../lib/getPostByLiked'
import { getPostByProfileId } from '../lib/getPostByProfileId'
import { getProfileById } from '../lib/getProfileById'

export default async function ProfileDetail({ params }: { params: { profileId: string } }) {
  const { profileId } = params

  const profile = await getProfileById(profileId)
  const posts = await getPostByProfileId(profileId)
  const liked_posts = await getPostByLiked(profileId)
  const posts_count = posts?.length

  if (!profile) {
    notFound()
  }

  // ログインユーザーかの確認
  const cookiesStore = cookies()
  const loginUserId = cookiesStore.get('loginUserId')
  const isLoginUser = loginUserId?.value === profileId

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BackNavbar name={profile?.username} isLoginUser={isLoginUser} />
        <div className="flex flex-col items-center justify-center p-8">
          <div className="max-w-[640px]">
            <ProfileHeader post_count={posts_count} profile={profile} />
            <PostTabs posts={posts} liked_posts={liked_posts} />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
