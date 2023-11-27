'use client'
import React, { useState } from 'react'
import { PencilLine, Utensils } from 'lucide-react'
import { AiFillTag } from 'react-icons/ai'
import ShopInfo from '@/app/post/_components/CardItem/ShopInfo/ShopInfo'
import { Button } from '@/components/ui/button'
import { PostDetailType } from '@/types/Post/types'
import { BackNavbar } from '../../../../_components/Common/Navbar/BackNavigationBar'
import { PostHeader } from '../../../_components/CardItem/Header'
import ImageOrModelViewer from '../MediaToggleViewer/MediaToggleViewer'
import Rating from '../Rating/Rating'

export default function PostDetail({ props }: { props: PostDetailType }) {
  const [isModel, setIsModel] = useState(false)

  const onClickModel = () => {
    setIsModel((prevState) => !prevState)
  }

  console.log(props)

  return (
    <div className="relative">
      <BackNavbar name={props.menu_name} />
      <div className="flex flex-col items-center justify-center">
        <div className="max-w-[580px] md:border md:shadow-lg">
          <PostHeader visited_date={props.visited_date} author={props.author} author_img={props.author_image} />

          {/* 画像といいね */}
          <ImageOrModelViewer menuPhoto={props.menu_photo} menuModel={props.menu_model} isModel={isModel} />

          <div className="flex-col space-y-4 px-5 py-3 pb-20">
            {/* メニューとボタン*/}
            <div className="flex">
              {/* 3Dボタン　：　モデルがあるかないかで表示を変える */}
              {props.menu_model && (
                <Button
                  onClick={onClickModel}
                  className="w-32 border bg-primary text-sm font-bold shadow-md hover:bg-primary/80 hover:text-white "
                >
                  {isModel ? '画像でみる' : '3Dでみる'}
                </Button>
              )}
            </div>

            {/* 値段と評価 */}
            <div className="flex justify-between">
              {/* 値段 */}
              <h4 className=" w-20 border-b pl-2 text-lg font-thin italic">¥{props.price}</h4>
              {/* 評価 */}
              <Rating score={props.score} />
            </div>

            {/* タグ */}
            <div className="flex flex-wrap items-center gap-2 py-2">
              <span>
                <AiFillTag />
              </span>
              {props.tags.map((tag) => (
                <span key={tag.id} className="rounded-sm border bg-primary/10 px-3 py-1 text-xs text-primary">
                  #{tag.tag}
                </span>
              ))}
            </div>

            {/* コメント */}
            <div>
              <h4 className="flex w-24 items-center text-center text-sm  font-bold italic">
                <PencilLine className="mr-2 text-primary" />
                コメント
              </h4>
              <p className="pt-2 text-sm">{props.review_text}</p>
            </div>

            {/* 店舗情報 */}
            <div className="flex flex-col ">
              <h4 className=" flex w-24 items-center justify-start text-left text-sm font-bold ">
                <Utensils className="mr-2 text-primary" />
                店舗情報
              </h4>
              <ShopInfo restaurant={props.restaurant} isDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
