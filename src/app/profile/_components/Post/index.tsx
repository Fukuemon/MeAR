import React, { FC } from 'react'
import Image from 'next/image'
import { AiFillHeart } from 'react-icons/ai'
import { MdComment } from 'react-icons/md'
import { tPostCard } from '@/types/Post/types'

const ProfilePost: FC<tPostCard> = (post) => {
  return (
    <div className="grid grid-cols-3 gap-2 pl-4 pt-2">
      <div className="group relative">
        {/* 画像 */}
        <Image
          src={post.image}
          alt="post"
          width={200}
          height={200}
          className=" absolute h-28 w-28 rounded-lg object-cover"
        />
        {/* いいね、コメント */}
        <div className="absolute left-1 top-1 z-10 h-full w-full items-center justify-evenly  bg-gray-200 ">
          <p className="flex items-center text-xs font-bold text-white">
            <AiFillHeart className="text-sm text-primary" />
            <span>100</span>
          </p>
          <p className=" flex items-center text-xs font-bold text-white">
            <MdComment className="text-sm text-white " />
            <span>100</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePost
