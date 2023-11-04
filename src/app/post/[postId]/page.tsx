import React from 'react'
import { notFound } from 'next/navigation'
import { PostDetailType } from '@/types/Post/types'
import { getPostDetail } from '../lib/getPostDetails'
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
  const post: PostDetailType = await getPostDetail(postId)

  if (!post) {
    notFound()
  }

  return <PostDetail props={post} />
}
