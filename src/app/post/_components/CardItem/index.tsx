import React, { FC } from 'react'
import clsx from 'clsx'
import { getCookie } from 'cookies-next'
import { Heart } from 'lucide-react'
import Link from 'next/link'
import Loading from '@/app/loading'
import { PostListItem } from '@/types/Post/types'
import Tag from '../Tag/Tag'
import { PostHeader } from './Header'
import ShopInfo from './ShopInfo/ShopInfo'

type Props = {
  post: PostListItem
}

const PostCardItem: FC<Props> = ({ post }) => {
  const loginUserId = getCookie('loginUserId')?.toString()
  if (!post) return <Loading />
  let isLiked = false

  if (post.likes.map((like) => like.id).includes(Number(loginUserId))) {
    isLiked = true
  }
  const author_id = post.author_id

  return (
    <div className="w-screen overflow-hidden rounded-lg border  bg-white text-gray-700 md:max-w-md">
      {/* ヘッダー */}
      <PostHeader
        author={post.author}
        visited_date={post.visited_date}
        author_img={post.author_image}
        author_id={author_id}
      />
      <Link key={post.id} href={`/post/${post.id}`}>
        {/* コンテンツ */}
        {/* 画像 */}
        {post.menu_photo && (
          <img src={post.menu_photo} className="object-cover" alt="ステーキコンボ" width={500} height={420} />
        )}
        {/* 店舗情報 */}
        <div className="mx-2">
          <ShopInfo restaurant={post.restaurant} />
        </div>

        <div className="relative flex justify-between">
          {/* 左側のコンテンツ */}
          <div className="mx-4 mb-4 flex flex-col space-y-4">
            {/* メニュー */}
            <h2 className="line-clamp-1 truncate text-lg font-semibold">{post.menu_name}</h2>
            {/* タグ一覧 */}
            <div className="flex flex-wrap items-center gap-2 pl-2">
              {post.tags.map((tag) => (
                <Tag key={tag.id} name={tag.tag} className="text-sm" />
              ))}
            </div>
            {/* いいねボタン：いいねの状態によって表示を変える */}
            <Heart
              className={clsx('text-4xl text-gray-500 ', {
                ' text-primary fill-current': isLiked
              })}
            />
          </div>

          {/* 右側のコンテンツ */}
          <div className="absolute bottom-3 right-5 flex flex-col justify-end">
            {/* 3Dタグ　：　モデルがあるかないかで表示を変える */}
            {post.model_exists_flg && (
              <span className="w-16 rounded-full border bg-cyan-100 px-3 py-1 font-mono text-xs text-blue-800">
                3Dつき
              </span>
            )}
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PostCardItem
