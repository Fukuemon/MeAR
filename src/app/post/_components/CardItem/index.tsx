import React, { FC } from 'react'
import clsx from 'clsx'
import { Heart, Tag } from 'lucide-react'
import Image from 'next/legacy/image'

import { PostListItem } from '@/types/Post/types'
import { PostHeader } from './Header'
import ShopInfo from './ShopInfo/ShopInfo'

type Props = {
  id: string
  post: PostListItem
}

const PostCardItem: FC<Props> = ({ id, post }) => {
  const loggedInUserId = id
  const isLikedByLoggedInUser = post.likes?.includes(loggedInUserId)

  return (
    <div className="w-screen overflow-hidden rounded-lg border  bg-white text-gray-700 md:max-w-md">
      {/* ヘッダー */}
      <PostHeader author={post.author} visited_date={post.visited_date} author_img={post.author_img} />

      {/* コンテンツ */}
      {/* 画像 */}
      {post.menu_photo && (
        <Image src={post.menu_photo} className="object-cover" alt="ステーキコンボ" width={500} height={420} />
      )}
      {/* 店舗情報 */}
      <div className="mx-2">
        <ShopInfo restaurant={post.restaurant} />
      </div>

      <div className="flex justify-between">
        {/* 左側のコンテンツ */}
        <div className="mx-4 mb-4 flex flex-col space-y-4">
          {/* メニュー */}
          <h2 className="truncate text-lg font-semibold">{post.menu_name}</h2>
          {/* タグ一覧 */}
          <div className="flex flex-wrap items-center gap-2 pl-2">
            {post.tags.map((tag) => (
              <span key={tag.id} className="rounded-md border bg-primary/10 px-3 py-1 font-mono text-xs text-primary">
                <Tag className="mr-1 inline-block h-3 w-3" />
                {tag.tag}
              </span>
            ))}
          </div>
          {/* いいねボタン：いいねの状態によって表示を変える */}
          <Heart
            className={clsx('text-4xl text-gray-500 ', {
              'text-pink-600 fill-current': isLikedByLoggedInUser
            })}
          />
        </div>

        {/* 右側のコンテンツ */}
        <div className="flex flex-col items-center px-5">
          {/* 3Dタグ　：　モデルがあるかないかで表示を変える */}
          {post.model_exists_flg && (
            <span className="w-16 rounded-full border bg-cyan-100 px-3 py-1 font-mono text-xs text-blue-800">
              3Dあり
            </span>
          )}
        </div>
      </div>
    </div>
  )
}

export default PostCardItem
