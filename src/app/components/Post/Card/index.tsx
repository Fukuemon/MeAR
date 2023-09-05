import React, { FC } from "react";
import Image from "next/legacy/image";
import steak from "/public/steakcombo.jpeg";
import user from "/public/penguin.jpeg";
import { AiOutlineHeart } from "react-icons/ai";
import { BsShop } from "react-icons/bs";
import { Author, tPostCard } from "@/model/Post";

// Propsの型定義
type Props = {
  author: Author;
  post: tPostCard;
  user: string;
};

const PostCard: FC = () => {
  return (
    <div className="card">
      {/* ヘッダー */}
      <div className="card-header">
        {/* 左側：ユーザー紹鴎*/}
        <div className="flex items-center">
          <Image
            src={user}
            className="rounded-full "
            alt="ユーザーアイコン"
            width={40}
            height={40}
          />
          <h2 className="font-bold">ふくえもん</h2>
        </div>

        {/* 日付 */}
        <h2 className="font-bold pr-4 text-xl ">2023-05-26</h2>
      </div>

      {/* コンテンツ */}
      {/* 画像 */}
      <Image
        src={steak}
        className="w-full h-full object-cover"
        alt="ステーキコンボ"
      />

      <div className="flex justify-between">
        {/* 左側のコンテンツ */}
        {/* 店舗 */}
        <div className="py-3 px-5 flex flex-col gap-3">
          <div className="flex card-title items-center">
            <span>
              <BsShop />
            </span>
            <h2 className="pl-1" title="ステーキコンボ">
              8EIGHTH BEEF
            </h2>
          </div>

          {/* メニュー */}
          <h2 className="card-subtitle" title="ステーキコンボ">
            ステーキコンボ
          </h2>
        </div>

        {/* 右側のコンテンツ */}
        <div className="p-3 px-5 flex flex-col gap-3 items-center">
          {/* 3Dタグ */}
          <span className="badge">3D</span>

          {/* いいねボタン */}
          <AiOutlineHeart className="text-4xl" />
        </div>
      </div>
    </div>
  );
};

export default PostCard;
