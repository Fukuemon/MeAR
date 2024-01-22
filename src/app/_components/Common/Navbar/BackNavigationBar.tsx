'use client'
import { FC } from 'react'
import { Settings } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'

type Props = {
  name?: string
  isHome?: boolean
  isLoginUser?: boolean
  post_id?: string
  profile_id?: number
}

// 投稿画面のナビゲーションバー
export const BackNavbar: FC<Props> = (props) => {
  const router = useRouter()

  return (
    <nav className="navbar relative items-center justify-center">
      {/* 戻るボタン */}
      <div className="absolute left-2 top-3 z-10">
        {props.isLoginUser || props.isHome ? ( // isLoginUserがtrueの場合は何も表示しない // isLoginUserがfalseかつisHomeがtrueの場合、ホーム画面に戻る
          <Link href="/">
            <MdOutlineArrowBackIosNew className="text-3xl text-black" />
          </Link>
        ) : (
          // isLoginUserがfalseかつisHomeがfalseの場合、前の画面に戻る
          <MdOutlineArrowBackIosNew className="text-3xl text-black" onClick={() => router.back()} />
        )}
      </div>

      <h2 className=" w-4/5 truncate text-center text-base font-bold italic md:text-2xl">{props.name}</h2>
      <div className="absolute right-2 top-3 z-10">
        {/* 編集ボタン(ログインユーザーの場合に投稿の場合(isPost)とプロフィールの場合{isUser}でLink先を分ける) */}
        {props.isLoginUser ? (
          <Link href={props.post_id ? `/post/${props.post_id}/edit` : `/profile/${props.profile_id}/edit`}>
            <Settings className="text-3xl text-black" />
          </Link>
        ) : null}
      </div>
    </nav>
  )
}
