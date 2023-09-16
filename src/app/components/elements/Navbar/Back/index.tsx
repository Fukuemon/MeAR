import Link from "next/link";
import { FC } from "react";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

type Props = {
  name?: string;
};

//　投稿画面のナビゲーションバー
export const PostNavbar: FC<Props> = (props) => {
  return (
    <nav className="navbar items-center justify-center relative">
      <Link href="/" className="absolute z-1 left-2 top-4">
        <MdOutlineArrowBackIosNew className="text-3xl text-black " />
      </Link>
      <h2 className="text-2xl italic font-bold">{props.name}</h2>
    </nav>
  );
};
