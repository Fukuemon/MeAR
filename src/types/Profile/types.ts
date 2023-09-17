// Profileの型定義

import { StaticImageData } from "next/image";

export interface Profile {
  nickName: string;
  userProfile: number;
  created_on?: string;
  img: StaticImageData;
  followings: Follow[];
  followers: Follow[];
}

export interface Follow {
  nickName: string;
  created_on: string;
  img: string;
}
