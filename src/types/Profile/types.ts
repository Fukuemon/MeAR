// Profileの型定義

export interface Profile {
  nickName: string;
  userProfile: number;
  created_on?: string;
  img?: string | object;
  followings: Follow[];
  followers: Follow[];
}

export interface Follow {
  nickName: string;
  created_on: string;
  img: string;
}
