'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { AiFillTag, AiFillHeart } from 'react-icons/ai'
import steak from '/public/steakcombo.jpeg'
import { GrLocation } from 'react-icons/gr'

import { Button } from '@/components/ui/button'
import { Mockdata } from '@/model/PostCard'
import { BackNavbar } from '../../../../_components/Common/Navbar/Back'
import { CardHeader } from '../../../_components/Card/Header'
import { DynamicModelViewer } from '../../../_components/ModelViewer/DynamicModelViewer'

const data = Mockdata

const PostDetail = () => {
  const [isLike, setIsLike] = useState(false)
  const [isModel, setIsModel] = useState(false)
  // いいねボタンを押したときの処理
  const onClicklike = () => {
    setIsLike((preveState) => !preveState)
  }
  const onClickModel = () => {
    setIsModel((preveState) => !preveState)
  }

  return (
    <div>
      <BackNavbar name="8EIGHT BEEF" />
      <CardHeader {...data} />

      {/* 画像といいね */}
      <div className="relative z-0">
        {/* 3Dタグ　：　モデルがあるかないかで表示を変える */}
        {isModel ? (
          <div className="flex items-center justify-center">
            <DynamicModelViewer src="/steakcombo.glb" />
          </div>
        ) : (
          <Image src={steak} className="h-full w-full object-cover" alt="ステーキコンボ" />
        )}

        <span className=" absolute right-4 top-2">
          {isLike ? (
            <AiFillHeart onClick={onClicklike} className="text-5xl text-primary " />
          ) : (
            <AiFillHeart onClick={onClicklike} className="text-5xl text-gray-400" />
          )}
        </span>
      </div>

      <div className="flex-col gap-3 space-y-1 px-5 py-3 ">
        {/* メニューとボタン*/}
        <div className="flex justify-between">
          <h2 className="card-subtitle" title="ステーキコンボ">
            ステーキコンボ
          </h2>
          {/* 3Dボタン　：　モデルがあるかないかで表示を変える */}
          <Button
            onClick={onClickModel}
            className="w-32 border bg-main text-sm font-bold text-gray-600 shadow-md hover:bg-gray-600 hover:text-white "
          >
            {isModel ? '画像でみる' : '3Dでみる'}
          </Button>
        </div>

        {/* 値段と評価 */}
        <div className="flex justify-between">
          {/* 値段 */}
          <h4 className=" w-20 border-b pl-2 text-lg font-thin italic">¥ 1,480</h4>
          {/* 評価 */}
          <div className="flex items-center gap-1">
            <span className="text-2xl text-yellow-400">★</span>
            <span className="text-2xl text-yellow-400">★</span>
            <span className="text-2xl text-yellow-400">★</span>
            <span className="text-2xl text-yellow-400">★</span>
            <span className="text-2xl text-yellow-400">★</span>
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
        <h4 className=" w-20 border-b text-center text-sm font-thin italic">✍️コメント</h4>
        <p className="border-b p-2 text-sm">
          すごくうまかった！
          <br /> 1480円でサラダバー付き、ステーキ食べれるのはコスパ最高すぎです！！
        </p>

        {/* 店舗情報 */}
        <div className="flex flex-col gap-2 py-4">
          <h3 className="w-24 border-b text-lg">~店舗情報~</h3>
          {/* 住所 */}
          <div className="flex items-center gap-2">
            <GrLocation className="text-3xl" />
            <p className="p-2  text-sm">
              〒650-0044 兵庫県神戸市中央区東川崎町1丁目6-1
              <br /> 神戸ハーバーランドumie モザイク 1F
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default PostDetail
