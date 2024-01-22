'use client'
import { BackNavbar } from '@/app/_components/Common/Navbar/BackNavigationBar'
import Loading from '@/app/loading'
import { PostDetailType } from '@/types/Post/types'
import { useGetPostDetail } from '../../hooks/useGetPostDetail'
import { EditPost } from './_components/EditPost'

export type EditPostType = Pick<
  PostDetailType,
  'id' | 'tags' | 'visited_date' | 'menu_name' | 'score' | 'price' | 'menu_photo' | 'menu_model' | 'review_text'
>

export default function PostEditPage({ params }: { params: { postId: string } }) {
  const { postId } = params
  const { post } = useGetPostDetail(postId)
  if (!post) return <Loading />

  const editPost: EditPostType = {
    id: post.id,
    tags: post.tags,
    visited_date: post.visited_date,
    menu_name: post.menu_name,
    score: post.score,
    price: post.price,
    menu_photo: post.menu_photo,
    menu_model: post.menu_model,
    review_text: post.review_text
  }

  return (
    <div>
      <BackNavbar name="投稿編集" />
      <div className="flex flex-col items-center pb-20 pt-8">
        <div className="max-w-[640px]">
          <EditPost post={editPost} />
        </div>
      </div>
    </div>
  )
}
