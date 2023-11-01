import { PostList, PostListItem } from '@/types/Post/types'
import PostCard from '../Card'

// PostCardList component
type PostListProps = {
  postList: PostList
}

export function PostCardList({ postList }: PostListProps) {
  return (
    <div className="flex w-screen flex-col gap-4">
      {postList.map((post: PostListItem) => {
        return <PostCard key={post.id} id="1" props={post} />
      })}
    </div>
  )
}
