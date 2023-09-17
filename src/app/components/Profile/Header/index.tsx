import Image from "next/image";
import React, { FC } from "react";

import { Profile } from "@/types/Profile/types";

type Props = {
  profile: Profile;
};

const ProfileHeader: FC<Props> = (props) => {
  return (
    <div className="max-w-6xl p-4">
      <div className="grid grid-cols-3 gap-4">
        {/* avatar画像 */}
        <div className="col-span-1">
          <Image
            src={props.profile.img}
            alt="steak"
            width={200}
            height={200}
            className="rounded-full w-20 h-20"
          />
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
