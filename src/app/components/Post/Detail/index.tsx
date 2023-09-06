import React, { FC } from "react";

type Props = {
  restaurant: string;
};

export const PostNavbar: FC<Props> = (props) => {
  return (
    <nav className="navbar items-center justify-center">
      <h2 className="text-2xl italic font-bold">{props.restaurant}</h2>
    </nav>
  );
};

const PostDetail = () => {
  return (
    <div>
      <PostNavbar restaurant="8EIGHT BEEF" />
      <div></div>;
    </div>
  );
};

export default PostDetail;
