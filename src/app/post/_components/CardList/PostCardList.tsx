'use client'
import Loading from '@/app/loading'
import { PostListItem } from '@/types/Post/types'
import { useGetPostList } from '../../hooks/useGetPostList'
import PostCardItem from '../CardItem'

export async function PostCardList() {
  const { postList } = useGetPostList()
  if (!postList) {
    return <Loading />
  }

  return (
    <div className="flex max-w-2xl flex-col  md:items-center md:justify-center">
      {postList.map((post: PostListItem) => {
        return <PostCardItem key={post.id} id="1" post={post} />
      })}
    </div>
  )
}
