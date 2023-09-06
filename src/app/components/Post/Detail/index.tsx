"use client";
import Link from "next/link";
import React, { FC, useState } from "react";
import { AiFillTag, AiFillHeart } from "react-icons/ai";
import { MdOutlineArrowBackIosNew } from "react-icons/md";
import { CardHeader } from "../Card/Header";
import { Mockdata } from "@/app/page";
import Image from "next/image";
import steak from "/public/steakcombo.jpeg";
import { GrLocation } from "react-icons/gr";
type Props = {
  restaurant: string;
};

const data = Mockdata;

// 投稿詳細画面のナビゲーションバー
export const PostNavbar: FC<Props> = (props) => {
  return (
    <nav className="navbar items-center justify-center relative">
      <Link href="/" className="absolute z-1 left-2 top-4">
        <MdOutlineArrowBackIosNew className="text-3xl text-black " />
      </Link>
      <h2 className="text-2xl italic font-bold">{props.restaurant}</h2>
    </nav>
  );
};

const PostDetail = () => {
  const [isLike, setIsLike] = useState(false);
  // いいねボタンを押したときの処理
  const onClicklike = () => {
    setIsLike((preveState) => !preveState);
  };
  return (
    <div>
      <PostNavbar restaurant="8EIGHT BEEF" />
      <CardHeader {...data} />
      {/* 画像といいね */}
      <div className="relative z-0">
        <Image
          src={steak}
          className="w-full h-full object-cover"
          alt="ステーキコンボ"
        />
        <span className=" absolute right-4 bottom-2">
          {isLike ? (
            <AiFillHeart
              onClick={onClicklike}
              className="text-5xl text-red-500 "
            />
          ) : (
            <AiFillHeart
              onClick={onClicklike}
              className="text-5xl text-white"
            />
          )}
        </span>
      </div>

      <div className="px-5 py-3 flex-col gap-3 space-y-1 ">
        {/* メニュー */}
        <h2 className="card-subtitle" title="ステーキコンボ">
          ステーキコンボ
        </h2>

        {/* 値段と評価 */}
        <div className="flex justify-between">
          {/* 値段 */}
          <h4 className="text-lg font-thin border-b w-20 pl-2">¥ 1,480</h4>
          {/* 評価 */}
          <div className="flex items-center gap-1">
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-yellow-400 text-2xl">★</span>
            <span className="text-yellow-400 text-2xl">★</span>
          </div>
        </div>

        {/* タグ */}
        <div className="flex flex-wrap items-center gap-2 py-2">
          <span>
            <AiFillTag />
          </span>
          <span className="tag"># 洋食</span>
          <span className="tag">#ランチ</span>
        </div>

        {/* コメント */}
        <h4 className="text-sm font-thin border-b w-20 text-center">
          ✍️コメント
        </h4>
        <p className="text-sm border-b p-2">
          すごくうまかった！
          <br />{" "}
          1480円でサラダバー付き、ステーキ食べれるのはコスパ最高すぎです！！
        </p>

        {/* 店舗情報 */}
        <div className="py-4 lex flex-col gap-2">
          <h3 className="text-lg border-b w-24">~店舗情報~</h3>
          {/* 住所 */}
          <div className="flex items-center gap-2">
            <GrLocation className="text-3xl" />
            <p className="text-sm  p-2">
              〒650-0044 兵庫県神戸市中央区東川崎町1丁目6-1
              <br /> 神戸ハーバーランドumie モザイク 1F
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostDetail;
