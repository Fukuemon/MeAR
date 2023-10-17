import React, { FC } from 'react'
import Image from 'next/image'

import { Profile } from '@/types/Profile/types'

const ProfileHeader: FC<Profile> = (profile) => {
  return (
    <div className="max-w-6xl py-8 pl-4">
      <div className="flex">
        {/* avatar画像 */}
        <div className="">
          <Image
            src={profile.img}
            alt="steak"
            width={200}
            height={200}
            className="h-28 w-28 rounded-full sm:w-40 md:h-40"
          />
        </div>

        {/* 投稿数・フォローフォロワー*/}
        <div className="flex justify-center px-4  pt-6">
          {/* 投稿数 */}
          <div className="flex flex-col items-center px-4">
            <h2 className="text-lg font-bold">1</h2>
            <h2 className="text-xs font-thin text-gray-500">投稿</h2>
          </div>
          {/* フォロー数 */}
          <div className="flex flex-col items-center px-4">
            <h2 className="text-lg font-bold">{profile.followings.length}</h2>
            <h2 className="text-xs font-thin text-gray-500">フォロー</h2>
          </div>
          {/* フォロワー数 */}
          <div className="flex flex-col items-center">
            <h2 className="text-lg font-bold">{profile.followers.length}</h2>
            <h2 className=" text-xs font-thin text-gray-500">フォロワー</h2>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  )
}

export default ProfileHeader
