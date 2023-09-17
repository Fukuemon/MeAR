import React, { FC } from "react";
import ProfileHeader from "./Header";
import { Profile } from "@/types/Profile/types";
import TabBar from "./TabBar";
import ProfilePost from "./Post";
import { tPostCard } from "@/types/Post/types";

type Props = {
  profile: Profile;
  post: tPostCard; // ここにcontents(post, like, model)を追加
};

const Profile: FC<Props> = (props) => {
  return (
    <div>
      <ProfileHeader {...props.profile} />
      <TabBar />
      <ProfilePost {...props.post} />
    </div>
  );
};

export default Profile;
