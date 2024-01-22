'use client'
import { FC, Suspense } from 'react'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import Loading from '@/app/loading'
import ProfileHeader from '../_components/Header'
import PostTabs from '../_components/PostTabs'
import { useGetPostByLiked } from '../hooks/useGetPostByLiked'
import { useGetPostByProfileId } from '../hooks/useGetPostByProfileId'
import { useGetProfileById } from '../hooks/useGetProfileById'

type ProfileProps = {
  profileId: string
  isLoginUser?: boolean
}

export const Profile: FC<ProfileProps> = ({ profileId, isLoginUser }) => {
  const { profile, error } = useGetProfileById(profileId)
  const { posts, profilePostError } = useGetPostByProfileId(profileId)
  const { likedPosts, errorLikedPost } = useGetPostByLiked(profileId)
  const posts_count = posts?.length

  if (!profile) {
    return <Loading />
  }
  // エラー処理
  if (error || profilePostError || errorLikedPost) {
    return <div>error</div>
  }
  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BackNavbar name={profile?.username} isLoginUser={isLoginUser} profile_id={profile.id} />
        <div className="flex flex-col items-center justify-center p-8">
          <div className="max-w-[640px]">
            <ProfileHeader post_count={posts_count} profile={profile} />
            <PostTabs posts={posts} liked_posts={likedPosts} />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
