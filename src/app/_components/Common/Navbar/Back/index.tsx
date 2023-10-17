"use client";
import { FC } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { MdOutlineArrowBackIosNew } from "react-icons/md";

type Props = {
  name?: string;
  isHome?: boolean;
};

//　投稿画面のナビゲーションバー
export const BackNavbar: FC<Props> = (props) => {
  const router = useRouter();

  return (
    <nav className="navbar items-center justify-center relative">
      {/* 戻るボタン */}
      <div className="absolute z-1 left-2 top-4">
        {props.isHome ? ( // isHomeがtrueの場合は、ホーム画面に戻る
          <Link href="/">
            <MdOutlineArrowBackIosNew className="text-3xl text-black" />
          </Link>
        ) : (
          // isHomeがfalseの場合は、前の画面に戻る
          <MdOutlineArrowBackIosNew
            className="text-3xl text-black"
            onClick={() => router.back()}
          />
        )}
      </div>

      <h2 className=" w-4/5 text-base text-center md:text-2xl italic font-bold truncate">
        {props.name}
      </h2>
    </nav>
  );
};
