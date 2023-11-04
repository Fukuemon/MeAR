import React from 'react'
import { notFound } from 'next/navigation'
import { PostDetailType } from '@/types/Post/types'
import { getPostDetail } from '../lib/getPostDetails'
import { getPostList } from '../lib/getPostList'
import PostDetail from './_components/DetailPost'

export const generateStaticParams = async () => {
  const posts = await getPostList()

  return posts.map((post) => ({
    postid: post.id.toString()
  }))
}

export default async function PostDetailPage({ params }: { params: { postid: string } }) {
  const { postid } = params
  console.log(postid)
  const post: PostDetailType = await getPostDetail(postid)

  if (!post) {
    notFound()
  }

  return <PostDetail props={post} />
}
