import React, { FC } from 'react'
import Image from 'next/image'
import { AiFillHeart } from 'react-icons/ai'
import { MdComment } from 'react-icons/md'
import { tPostCard } from '@/types/Post/types'

const ProfilePost: FC<tPostCard> = (post) => {
  return (
    <div className="pl-4 pt-2 grid grid-cols-3 gap-2">
      <div className="relative group">
        {/* 画像 */}
        <Image
          src={post.image}
          alt="post"
          width={200}
          height={200}
          className=" absolute object-cover rounded-lg w-28 h-28"
        />
        {/* いいね、コメント */}
        <div className="absolute top-1 left-1 bg-gray-200 z-10 w-full justify-evenly items-center h-full  bg-black-faded group-hover:flex group-hover:top-16">
          <p className=" text-xs flex items--center text-white font-bold">
            <AiFillHeart className="text-sm text-red-400" />
            <span>100</span>
          </p>
          <p className=" text-xs flex items-center text-white font-bold">
            <MdComment className="text-sm text-white " />
            <span>100</span>
          </p>
        </div>
      </div>
    </div>
  )
}

export default ProfilePost
