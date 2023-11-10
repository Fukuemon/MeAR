import React, { FC } from 'react'
import clsx from 'clsx'
import { Heart } from 'lucide-react'
import Image from 'next/legacy/image'

import { BsShop } from 'react-icons/bs'
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
    <div className="  w-screen overflow-hidden  rounded-lg  border bg-white text-gray-700 md:max-w-md">
      {/* ヘッダー */}
      <PostHeader author={post.author} visited_date={post.visited_date} author_img={post.author_img} />

      {/* コンテンツ */}
      {/* 画像 */}
      {post.menu_photo && (
        <Image
          src={post.menu_photo}
          className="h-full w-full object-cover"
          alt="ステーキコンボ"
          width={500}
          height={400}
        />
      )}

      <div className="flex justify-between border">
        {/* 左側のコンテンツ */}
        {/* 店舗 */}
        <div className="my-5 flex flex-col gap-3 px-5">
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
        <div className=" relative flex flex-col items-center gap-3 p-3 px-5">
          {/* 3Dタグ　：　モデルがあるかないかで表示を変える */}
          {post.model_exists_flg && <span className="badge absolute right-3 top-3 w-16">3Dあり</span>}
          {/* いいねボタン：いいねの状態によって表示を変える */}
          <Heart
            className={clsx('absolute bottom-3 right-8 text-4xl text-gray-100 ', {
              'text-pink-600': isLikedByLoggedInUser
            })}
          />
        </div>
      </div>
    </div>
  )
}

export default PostCardItem
