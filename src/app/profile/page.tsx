import React from 'react'
import { PostCardModel } from '@/model/PostCard'
import { mockProfileData } from '@/model/Profile'
import { BackNavbar } from '../_components/Common/Navbar/BackNavigationBar'
import Profile from './_components/Profile'

const profile = mockProfileData // モックデータを取得
const post = PostCardModel // モックデータを取得

const contents = {
  profile,
  post
}

const MyProfilePage = () => {
  return (
    <div>
      <BackNavbar name={profile.nickName} />
      <Profile {...contents} />
    </div>
  )
}

export default MyProfilePage
