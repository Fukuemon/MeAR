import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { PiNotebookBold } from 'react-icons/pi'

const ProfileTabBar = () => {
  return (
    <div>
      {/* 切り替えコンテンツ */}
      <div className="flex justify-center gap-24">
        <button className="flex justify-center items-center border-gray-800 py-2 text-sm font-semibold gap-2 text-gray-400 focus:text-gray-600 focus:border-b">
          <PiNotebookBold className="text-3xl" />
          投稿
        </button>
        <button className="flex justify-center items-center border-gray-800 py-2 text-sm font-semibold gap-2 text-gray-400 focus:text-gray-600 focus:border-b">
          <AiFillHeart className="text-3xl" />
          いいね
        </button>
      </div>
      {/* 軸 */}
      <div className="border border-gray-400 bottom-1  mx-4" />
    </div>
  )
}

export default ProfileTabBar
