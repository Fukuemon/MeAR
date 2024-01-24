import React, { Suspense } from 'react'
import { BottomNavbarContainer } from '@/app/_components/Common/BottomNavbar'
import Loading from '@/app/loading'
import PostDetail from './_components/PostDetail/PostDetail'

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const { postId } = params

  return (
    <div>
      <Suspense fallback={<Loading />}>
        <PostDetail postId={postId} />
      </Suspense>
      <BottomNavbarContainer />
    </div>
  )
}
