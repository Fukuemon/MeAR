import React, { FC } from "react";
import ProfileHeader from "./Header";
import { Profile } from "@/types/Profile/types";

type Props = {
  profile: Profile;
  contents?: any; // ここにcontents(post, like, model)を追加
};

const Profile: FC<Props> = (props) => {
  return <ProfileHeader {...props} />;
};

export default Profile;
