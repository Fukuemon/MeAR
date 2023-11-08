'use client'
import React, { FC, useState } from 'react'
import { AiFillHeart } from 'react-icons/ai'
import { PiNotebookBold } from 'react-icons/pi'
import { PostList, PostListItem } from '@/types/Post/types'
import ProfilePost from '../ProfilePost'

type PostTabsProps = {
  posts?: PostList
  liked_posts?: PostList
}

const PostTabs: FC<PostTabsProps> = ({ posts, liked_posts }) => {
  const [activeTab, setActiveTab] = useState('posts')

  // 切り替えを管理する関数
  const toggleActiveTab = (tabName: string) => {
    setActiveTab(tabName)
  }

  return (
    <div>
      <div>
        {/* 切り替えコンテンツ */}
        <div className="flex justify-center gap-24">
          {/* 投稿ボタン */}
          <button
            className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold ${
              activeTab === 'posts' ? 'border-b text-gray-600' : 'text-gray-400'
            }`}
            onClick={() => toggleActiveTab('posts')}
          >
            <PiNotebookBold className="text-3xl" />
            投稿
          </button>
          {/* いいねボタン */}
          <button
            className={`flex items-center justify-center gap-2 py-2 text-sm font-semibold ${
              activeTab === 'likes' ? 'border-b text-gray-600' : 'text-gray-400'
            }`}
            onClick={() => toggleActiveTab('likes')}
          >
            <AiFillHeart className="text-3xl" />
            いいね
          </button>
        </div>
        {/* 軸 */}
        <div className="bottom-1 mx-4 border border-gray-400" />
      </div>
      <div className="grid grid-cols-3 gap-2 pl-4 pt-2">
        {/* 条件に応じて投稿またはいいねした投稿を表示 */}
        {activeTab === 'posts'
          ? posts?.map((post: PostListItem) => <ProfilePost key={post.id} {...post} />)
          : liked_posts?.map((post: PostListItem) => <ProfilePost key={post.id} {...post} />)}
      </div>
    </div>
  )
}

export default PostTabs
