'use client'
import React, { FC } from 'react'
import { deleteCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useRouter } from 'next/navigation'
import { GrLogin } from 'react-icons/gr'
import { LoginUserAtom } from '@/app/(auth)/atom'
import { FeedNavDropdown } from './FeedDropdown/FeedNavDropdown'
import { FeedTabsContainer } from './FeedTabs/FeedTabsContainer'
type Props = {
  isLogin: boolean
}

const FeedNavbar: FC<Props> = ({ isLogin }) => {
  const router = useRouter()
  const [user, setUser] = useAtom(LoginUserAtom)

  const onLogin = () => {
    deleteCookie('access')
    deleteCookie('refresh')
    router.push('/login')
    setUser(RESET)
  }

  const onLogout = () => {
    deleteCookie('access')
    deleteCookie('refresh')
    // setIsLogin(false)
    router.push('/login')
    setUser(RESET)
  }

  return (
    // ナビゲーションバー
    <nav className="fixed z-50  w-full flex-col items-center space-y-6  border-2 bg-white p-4 text-base text-text sm:text-3xl md:h-14">
      <div className="flex justify-end">
        {/*右側のコンテンツ*/}
        {isLogin && user ? (
          <FeedNavDropdown user={user} onClickLogout={onLogout} />
        ) : (
          // // ログインしている場合：Avatar画像
          // <div className="flex items-center" onClick={onLogout}>
          //   <img src={user?.img ?? '/user.png'} alt="username" className="h-[40px] w-[40px] rounded-full" />
          // </div>
          // ログインしていない場合
          <div className="flex justify-items-center ">
            <GrLogin onClick={onLogin} className="mr-2 text-3xl" />
          </div>
        )}
      </div>
      <FeedTabsContainer />
    </nav>
  )
}

export default FeedNavbar
