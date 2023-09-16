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
