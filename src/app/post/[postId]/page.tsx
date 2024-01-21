import React, { Suspense } from 'react'
import { cookies } from 'next/headers'
import { notFound } from 'next/navigation'
import Loading from '@/app/loading'
import { getPostDetail } from '../lib/getPostDetail'
import PostDetail from './_components/PostDetail/PostDetail'

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const { postId } = params
  const cookieStore = cookies()
  const loginUserId = cookieStore.get('loginUserId')?.value

  const post = await getPostDetail(postId)

  if (!post) {
    notFound()
  }

  return (
    <Suspense fallback={<Loading />}>
      <PostDetail props={post} loginUserId={loginUserId!} />
    </Suspense>
  )
}
