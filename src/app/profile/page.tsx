import React from "react";
import { PostNavbar } from "../components/elements/Navbar/Back";
import Profile from "../components/Profile";
import { mockProfileData } from "@/model/Profile";
import { PostCardModel } from "@/model/PostCard";

const profile = mockProfileData; // モックデータを取得
const post = PostCardModel; // モックデータを取得

const contents = {
  profile,
  post,
};

const MyProfilePage = () => {
  return (
    <div>
      <PostNavbar name={profile.nickName} />
      <Profile {...contents} />
    </div>
  );
};

export default MyProfilePage;
