import React, { FC } from "react";
import { tPostCard } from "@/types/Post/types";
import { Profile } from "@/types/Profile/types";
import ProfileHeader from "../Header";
import ProfilePost from "../Post";
import TabBar from "../TabBar";

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
