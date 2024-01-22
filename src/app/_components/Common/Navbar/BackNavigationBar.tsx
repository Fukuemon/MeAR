'use client'
import { FC } from 'react'
import { deleteCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { MdOutlineArrowBackIosNew } from 'react-icons/md'
import { LoginUserAtom } from '@/app/(auth)/atom'
import { BackNavDropdown } from './BackNavDropdown'

type Props = {
  name?: string
  isHome?: boolean
  isLoginUser?: boolean
  post_id?: string
  profile_id?: string
}

// 投稿画面のナビゲーションバー
export const BackNavbar: FC<Props> = (props) => {
  const [user, setUser] = useAtom(LoginUserAtom)
  const router = useRouter()
  const onLogout = () => {
    deleteCookie('access')
    deleteCookie('refresh')
    // setIsLogin(false)
    router.push('/login')
    setUser(RESET)
  }

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
        {props.isLoginUser && user ? (
          <BackNavDropdown
            user={user}
            onClickLogout={onLogout}
            isPost={props.post_id ? true : false}
            isProfile={props.profile_id ? true : false}
          />
        ) : null}
      </div>
    </nav>
  )
}
