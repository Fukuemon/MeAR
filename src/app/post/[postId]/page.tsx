import React, { Suspense } from 'react'
import Loading from '@/app/loading'
import PostDetail from './_components/PostDetail/PostDetail'

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const { postId } = params

  return (
    <Suspense fallback={<Loading />}>
      <PostDetail postId={postId} />
    </Suspense>
  )
}
