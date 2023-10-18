import steak from '/public/steakcombo.jpeg'
import user from '/public/penguin.jpeg'
import { Author, Restaurant, tPostCard } from '@/types/Post/types'

// Mock Data (PostCard)
export const AuthorModel: Author = {
  id: 1,
  nickName: 'ふくえもん',
  avatarImg: user
}

export const RestaurantModel: Restaurant = {
  id: 1,
  name: '8EIGHT BEEF',
  address: '',
  location: ''
}

export const PostCardModel: tPostCard = {
  id: 1,
  restaurant: RestaurantModel,
  createdAt: '2023-05-26',
  menu: 'ステーキコンボ',
  image: steak,
  model: 'steakcombo.glb',
  author: AuthorModel
}

// PostCardに渡すデータ(仮)
export const Mockdata = {
  author: AuthorModel,
  post: PostCardModel,
  restaurant: RestaurantModel,
  isLike: true
}
