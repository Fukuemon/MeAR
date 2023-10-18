import React from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { PiNotebookBold } from 'react-icons/pi'

const ProfileTabBar = () => {
  return (
    <div>
      {/* 切り替えコンテンツ */}
      <div className="flex justify-center gap-24">
        <button className="flex items-center justify-center gap-2 border-gray-800 py-2 text-sm font-semibold text-gray-400 focus:border-b focus:text-gray-600">
          <PiNotebookBold className="text-3xl" />
          投稿
        </button>
        <button className="flex items-center justify-center gap-2 border-gray-800 py-2 text-sm font-semibold text-gray-400 focus:border-b focus:text-gray-600">
          <AiFillHeart className="text-3xl" />
          いいね
        </button>
      </div>
      {/* 軸 */}
      <div className="bottom-1 mx-4 border  border-gray-400" />
    </div>
  )
}

export default ProfileTabBar
