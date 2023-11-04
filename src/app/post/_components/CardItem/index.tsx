import React, { FC } from 'react'
import clsx from 'clsx'
import Image from 'next/legacy/image'

import { AiOutlineHeart } from 'react-icons/ai'
import { BsShop } from 'react-icons/bs'
import stake from '/public/steakcombo.jpeg'

import { PostListItem } from '@/types/Post/types'
import { PostHeader } from './Header'

type Props = {
  id: string
  post: PostListItem
}

const PostCardItem: FC<Props> = ({ id, post }) => {
  const loggedInUserId = id

  const isLikedByLoggedInUser = post.likes?.includes(loggedInUserId)

  return (
    <div className="m-2  w-screen overflow-hidden  rounded-lg  border bg-white text-gray-700 md:max-w-md">
      {/* ヘッダー */}
      <PostHeader author={post.author} visited_date={post.visited_date} />

      {/* コンテンツ */}
      {/* 画像 */}
      {post.menu_photo && (
        <Image src={stake} className="h-full w-full object-cover" alt="ステーキコンボ" width={500} height={300} />
      )}

      <div className="flex justify-between border">
        {/* 左側のコンテンツ */}
        {/* 店舗 */}
        <div className="flex flex-col gap-3 px-5 py-3">
          <div className="card-title flex items-center">
            <span>
              <BsShop />
            </span>
            <h2 className="pl-1" title="ステーキコンボ">
              {post.restaurant.name}
            </h2>
          </div>
          {/* メニュー */}
          <h2 className="card-subtitle" title="ステーキコンボ">
            {post.menu_name}
          </h2>
        </div>

        {/* 右側のコンテンツ */}
        <div className="flex flex-col items-center gap-3 p-3 px-5">
          {/* 3Dタグ　：　モデルがあるかないかで表示を変える */}
          {post.menu_model === '3D' ? <span className="badge">3D</span> : null}
          {/* いいねボタン：いいねの状態によって表示を変える */}
          <AiOutlineHeart className={clsx('text-4xl text-gray-100', { 'text-pink-600': isLikedByLoggedInUser })} />
        </div>
      </div>
    </div>
  )
}

export default PostCardItem
