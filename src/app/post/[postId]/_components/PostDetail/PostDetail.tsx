'use client'
import React, { useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { PencilLine, Utensils } from 'lucide-react'
import { AiFillTag } from 'react-icons/ai'
import { checkLoginUser } from '@/app/(auth)/lib/checkLoginUser'
import Loading from '@/app/loading'
import ShopInfo from '@/app/post/_components/CardItem/ShopInfo/ShopInfo'
import { useGetPostDetail } from '@/app/post/hooks/useGetPostDetail'
import { Button } from '@/components/ui/button'
import { toast } from '@/components/ui/use-toast'
import { BackNavbar } from '../../../../_components/Common/BackNavbar/BackNavigationBar'
import { PostHeader } from '../../../_components/CardItem/Header'
import ImageOrModelViewer from '../MediaToggleViewer/MediaToggleViewer'
import Rating from '../Rating/Rating'

type PostDetailProps = {
  postId: string
}

export default function PostDetail({ postId }: PostDetailProps) {
  const [isModel, setIsModel] = useState(false)
  const [isLoginUser, setIsLoginUser] = useState(false)
  const onClickModel = () => {
    setIsModel((prevState) => !prevState)
  }

  // 投稿詳細を取得
  const { post, mutate } = useGetPostDetail(postId)

  // tokenを取得
  const loginUserId = getCookie('loginUserId')?.toString()
  const accessToken = getCookie('access')?.toString()

  // ログインユーザーかどうか
  useEffect(() => {
    const checkLogin = async () => {
      if (post) {
        const isLoginUser = await checkLoginUser(post.author_id, accessToken)
        setIsLoginUser(isLoginUser)
      }
    }
    checkLogin()
  }, [post])

  if (!post) return <Loading />

  // いいねの状態
  let isLiked = false
  if (post.likes.map((like) => like.id).includes(Number(loginUserId))) {
    isLiked = true
  }

  // いいね機能
  const method = isLiked ? 'DELETE' : 'POST'

  // いいねボタンを押したときの処理
  const onClickLike = async () => {
    const massage = isLiked ? 'いいねを取り消しました' : 'いいねしました'
    toast({ title: massage })
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}post/${postId}/like/`
    await fetch(url, {
      method: method,
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    })
    mutate()
  }

  // ログインしているかどうか
  const isLogin = getCookie('access') ? true : false

  return (
    <div className="relative">
      <BackNavbar name={post.menu_name} post_id={post.id} isLoginUser={isLoginUser} />
      <div className="flex flex-col items-center justify-center">
        <div className="w-screen max-w-[580px] md:border md:shadow-lg">
          <PostHeader
            visited_date={post.visited_date}
            author={post.author}
            author_img={post.author_image}
            author_id={post.author_id}
          />

          {/* 画像といいね */}
          <ImageOrModelViewer
            menuPhoto={post.menu_photo}
            menuModel={post.menu_model}
            isModel={isModel}
            postId={post.id}
            isAuthor={isLoginUser}
            onClickLike={onClickLike}
            isLike={isLiked}
            isLogin={isLogin}
          />

          <div className="flex-col space-y-4 px-5 py-3 pb-20">
            {/* メニューとボタン*/}
            <div className="flex">
              {/* 3Dボタン　：　モデルがあるかないかで表示を変える */}
              {post.menu_model && (
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
              <h4 className=" w-20 border-b pl-2 text-lg font-thin italic">¥{post.price}</h4>
              {/* 評価 */}
              <Rating score={post.score} />
            </div>

            {/* タグ */}
            <div className="flex flex-wrap items-center gap-2 py-2">
              <span>
                <AiFillTag />
              </span>
              {post.tags.map((tag) => (
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
              <p className="pt-2 text-sm">{post.review_text}</p>
            </div>

            {/* 店舗情報 */}
            <div className="flex flex-col ">
              <h4 className=" flex w-24 items-center justify-start text-left text-sm font-bold ">
                <Utensils className="mr-2 text-primary" />
                店舗情報
              </h4>
              <ShopInfo restaurant={post.restaurant} isDetail />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
