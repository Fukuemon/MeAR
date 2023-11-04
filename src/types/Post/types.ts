import { StaticImageData } from 'next/image'

// Type (PostCard)
export type Author = {
  id: number
  nickName: string
  avatarImg: StaticImageData
}

export type tPostCard = {
  id: number
  restaurant: Restaurant
  createdAt: string
  menu: string
  image: StaticImageData
  model?: File | string
  author: Author
}

type Tag = {
  id: number
  tag: string
}

export type Restaurant = {
  id: number
  name: string
  address: string
  area: string
}

export type PostListItem = {
  id: number
  author: string
  author_id: number
  restaurant: Pick<Restaurant, 'name'>
  tags: Pick<Tag, 'tag'>[]
  menu_name: string
  menu_photo: string | null
  menu_model: string | null
  likes: string[] | null
  visited_date: string
  created_on: string
  updated_on: string
}

export type PostDetailType = {
  id: number
  author: string
  author_id: number
  likes: string[] | null
  tags: Tag[]
  restaurant: Restaurant
  created_on: string
  updated_on: string
  visited_date: string
  menu_name: string
  score: number
  price: number
  menu_photo: string
  menu_model: string | null
  review_text: string | null
}

// そして、全てのポストを含む配列の型は以下のようになります：
export type PostList = PostListItem[]
