import Link from 'next/link'
import { PostList, PostListItem } from '@/types/Post/types'
import PostCardItem from '../CardItem'

// PostCardList component
type PostListProps = {
  postList: PostList
}

export function PostCardList({ postList }: PostListProps) {
  return (
    <div className="flex max-w-2xl flex-col  md:items-center md:justify-center">
      {postList.map((post: PostListItem) => {
        return (
          <Link key={post.id} href={`/post/${post.id}`}>
            <PostCardItem key={post.id} id="1" post={post} />
          </Link>
        )
      })}
    </div>
  )
}
