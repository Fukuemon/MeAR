import React from "react";
import { BackNavbar } from "../_components/Common/Navbar/Back";
import Profile from "./_components/Profile";
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
      <BackNavbar name={profile.nickName} />
      <Profile {...contents} />
    </div>
  );
};

export default MyProfilePage;
