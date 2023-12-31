// Profileの型定義

interface Follow {
  username: string
  created_on: string
  img: string
}

export type ProfileType = {
  id: number
  username: string
  account: string
  created_on: string
  updated_on: string
  img: string
  followings: Follow[]
  followers: Follow[]
}

export type ProfileList = ProfileType[]
