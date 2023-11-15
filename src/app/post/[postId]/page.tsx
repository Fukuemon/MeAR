import React, { Suspense } from 'react'
import { notFound } from 'next/navigation'
import Loading from '@/app/loading'
import { getPostDetail } from '../lib/getPostDetail'
import { getPostList } from '../lib/getPostList'
import PostDetail from './_components/PostDetail/PostDetail'

export const generateStaticParams = async () => {
  const posts = await getPostList()

  return posts.map((post) => ({
    postId: post.id.toString()
  }))
}

export default async function PostDetailPage({ params }: { params: { postId: string } }) {
  const { postId } = params
  console.log(postId)

  const post = await getPostDetail(postId)

  if (!post) {
    notFound()
  }

  return (
    <Suspense fallback={<Loading />}>
      <PostDetail props={post} />
    </Suspense>
  )
}
