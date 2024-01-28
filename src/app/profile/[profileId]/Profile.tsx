'use client'
import { FC, Suspense, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { checkLoginUser } from '@/app/(auth)/lib/checkLoginUser'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import Loading from '@/app/loading'
import { toast } from '@/components/ui/use-toast'
import ProfileHeader from '../_components/Header'
import PostTabs from '../_components/PostTabs'
import { useGetPostByLiked } from '../hooks/useGetPostByLiked'
import { useGetPostByProfileId } from '../hooks/useGetPostByProfileId'
import { useGetProfileById } from '../hooks/useGetProfileById'

type ProfileProps = {
  profileId: string
}

export const Profile: FC<ProfileProps> = ({ profileId }) => {
  const [isLoginUser, setIsLoginUser] = useState(false)
  const { posts, profilePostError } = useGetPostByProfileId(profileId)
  const { likedPosts, errorLikedPost } = useGetPostByLiked(profileId)
  const { profile, error, mutateProfile } = useGetProfileById(profileId)
  const posts_count = posts?.length

  // tokenを取得
  const accessToken = getCookie('access')?.toString()

  useEffect(() => {
    if (profile && accessToken) {
      const checkLogin = async () => {
        const isLoginUser = await checkLoginUser(profile.id, accessToken)
        setIsLoginUser(isLoginUser)
      }
      checkLogin()
    }
  }, [profile, accessToken])

  if (!profile) {
    return <Loading />
  }

  // フォローしているかどうかのチェック
  const loginUserId = getCookie('loginUserId')?.toString()
  const isFollow = profile.followers.some((follower) => follower.id.toString() === loginUserId)

  // フォロー機能
  const onClickFollow = async () => {
    const method = isFollow ? 'DELETE' : 'POST'
    const message = isFollow ? 'フォローを解除しました' : 'フォローしました'
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}profile/follow/${profileId}/`

    try {
      const res = await fetch(url, {
        method: method,
        headers: {
          Authorization: `JWT ${accessToken}`
        }
      })
      if (!res.ok) {
        throw new Error('エラーが発生しました')
      }
      mutateProfile()
      toast({ title: message })
    } catch (err) {
      console.error(err)
      toast({ title: 'エラーが発生しました' })
    }
  }

  // エラー処理
  if (error || profilePostError || errorLikedPost) {
    return <div>エラーが発生しました</div>
  }
  // ログインしているかどうか
  const isLogin = getCookie('access') ? true : false

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <BackNavbar name={profile?.username} isLoginUser={isLoginUser} profile_id={profile.id} />
        <div className="flex flex-col items-center justify-center p-8">
          <div className="max-w-[640px]">
            <ProfileHeader
              post_count={posts_count}
              profile={profile}
              isFollow={isFollow}
              isLoginUser={isLoginUser}
              onClickFollow={onClickFollow}
              isLogin={isLogin}
            />
            <PostTabs posts={posts} liked_posts={likedPosts} />
          </div>
        </div>
      </Suspense>
    </div>
  )
}
