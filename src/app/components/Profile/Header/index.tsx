import Image from "next/image";
import React, { FC } from "react";

import { Profile } from "@/types/Profile/types";

type Props = {
  profile: Profile;
  contents?: any; // ここにcontents(post, like, model)を追加
};

const ProfileHeader: FC<Props> = (props) => {
  return (
    <div className="max-w-6xl pl-2 py-4">
      <div className="flex">
        {/* avatar画像 */}
        <div className="">
          <Image
            src={props.profile.img}
            alt="steak"
            width={200}
            height={200}
            className="rounded-full w-24 h-24"
          />
        </div>

        {/* 投稿数・フォローフォロワー*/}
        <div className="flex  pt-6  px-4">
          {/* 投稿数 */}
          <div className="flex flex-col items-center px-4">
            <h2 className="font-bold text-lg">1</h2>
            <h2 className="font-thin text-xs text-gray-500">投稿</h2>
          </div>
          {/* フォロー数 */}
          <div className="flex flex-col items-center px-4">
            <h2 className="font-bold text-lg">
              {props.profile.followings.length}
            </h2>
            <h2 className="font-thin text-xs text-gray-500">フォロー</h2>
          </div>
          {/* フォロワー数 */}
          <div className="flex flex-col items-center">
            <h2 className="font-bold text-lg">
              {props.profile.followers.length}
            </h2>
            <h2 className=" font-thin text-xs text-gray-500">フォロワー</h2>
          </div>
        </div>

        {/*  */}
      </div>
    </div>
  );
};

export default ProfileHeader;
