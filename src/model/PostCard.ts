import steak from "/public/steakcombo.jpeg";
import user from "/public/penguin.jpeg";

// Type (PostCard)
export type Author = {
  id: number;
  nickName: string;
  avatarImg: string | object;
};

export type Restaurant = {
  id: number;
  name: string;
  address: string;
  location: string;
};

export type tPostCard = {
  id: number;
  restaurant: Restaurant;
  createdAt: string;
  menu: string;
  image: File | object;
  model?: File | string;
  author: Author;
};

// Mock Data (PostCard)
export const AuthorModel: Author = {
  id: 1,
  nickName: "ふくえもん",
  avatarImg: { user },
};

export const RestaurantModel: Restaurant = {
  id: 1,
  name: "8EIGHT BEEF",
  address: "",
  location: "",
};

export const PostCardModel: tPostCard = {
  id: 1,
  restaurant: RestaurantModel,
  createdAt: "2023-05-26",
  menu: "ステーキコンボ",
  image: { steak },
  model: "steakcombo.glb",
  author: AuthorModel,
};
