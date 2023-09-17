import React, { FC } from "react";
import ProfileHeader from "./Header";
import { Profile } from "@/types/Profile/types";
import TabBar from "./TabBar";

type Props = {
  profile: Profile;
  contents?: any; // ここにcontents(post, like, model)を追加
};

const Profile: FC<Props> = (props) => {
  return (
    <div>
      <ProfileHeader {...props} />
      <TabBar />
    </div>
  );
};

export default Profile;
