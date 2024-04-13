'use client'
import React, { FC } from 'react'
import { deleteCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import { useRouter } from 'next/navigation'
import { GrLogin } from 'react-icons/gr'
import { LoginUserAtom } from '@/app/(auth)/atom'
import { cn } from '@/libs/tailwind/utils'
import { FeedNavDropdown } from './FeedDropdown/FeedNavDropdown'
import { FeedTabsContainer } from './FeedTabs/FeedTabsContainer'
type Props = {
  isLogin: boolean
  accessToken: string | undefined
}

const FeedNavbar: FC<Props> = ({ isLogin, accessToken }) => {
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
    <nav
      className={cn(
        'fixed z-50  w-full flex-col items-center space-y-6  rounded-b-xl border-2 bg-white px-2 pt-4 text-base text-text sm:text-3xl',
        !isLogin && 'pb-4'
      )}
    >
      <div className="flex justify-end">
        {/*右側のコンテンツ*/}
        {isLogin && user ? (
          <FeedNavDropdown user={user} onClickLogout={onLogout} />
        ) : (
          <div className="flex justify-items-center ">
            <GrLogin onClick={onLogin} className="mr-2 text-3xl" />
          </div>
        )}
      </div>
      {accessToken && <FeedTabsContainer />}
    </nav>
  )
}

export default FeedNavbar
