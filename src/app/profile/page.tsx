import React from "react";
import { PostNavbar } from "../components/elements/Navbar/Back";
import Profile from "../components/Profile";
import { mockProfileData } from "@/model/Profile";

const profile = mockProfileData; // モックデータを取得

const MyProfilePage = () => {
  return (
    <div>
      <PostNavbar />
      <Profile profile={profile} />
    </div>
  );
};

export default MyProfilePage;
