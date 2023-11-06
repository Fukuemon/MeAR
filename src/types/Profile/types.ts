// Profileの型定義

import Profile from '@/app/profile/_components/Profile'

interface Follow {
  username: string
  created_on: string
  img: string
}

export type Profile = {
  id: number
  username: string
  account: string
  created_on: string
  updated_on: string
  img: string
  followings: Follow[]
  followers: Follow[]
}

export type ProfileList = Profile[]
