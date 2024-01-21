import { PostList, PostListItem } from '@/types/Post/types'
import { getPostList } from '../../lib/getPostList'
import PostCardItem from '../CardItem'

export async function PostCardList() {
  const postList: PostList = await getPostList()

  return (
    <div className="flex max-w-2xl flex-col  md:items-center md:justify-center">
      {postList.map((post: PostListItem) => {
        return <PostCardItem key={post.id} id="1" post={post} />
      })}
    </div>
  )
}
