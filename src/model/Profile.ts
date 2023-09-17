import { Profile } from "@/types/Profile/types";
import user from "/public/penguin.jpeg";

export const mockProfileData: Profile = {
  nickName: "ふくえもん",
  userProfile: 12345,
  created_on: "2023-01-01",
  img: user,
  followings: [
    {
      nickName: "Alice",
      created_on: "2023-02-01",
      img: "path/to/alice/profile/image.jpg",
    },
    {
      nickName: "Bob",
      created_on: "2023-03-01",
      img: "path/to/bob/profile/image.jpg",
    },
  ],
  followers: [
    {
      nickName: "Charlie",
      created_on: "2023-04-01",
      img: "path/to/charlie/profile/image.jpg",
    },
    {
      nickName: "Dave",
      created_on: "2023-05-01",
      img: "path/to/dave/profile/image.jpg",
    },
  ],
};
