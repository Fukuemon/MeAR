'use client'
import React, { FC } from 'react'
import { deleteCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GrLogin } from 'react-icons/gr'
import { LoginUserAtom } from '@/app/(auth)/atom'
type Props = {
  isLogin: boolean
}

const Navbar: FC<Props> = ({ isLogin }) => {
  const router = useRouter()
  const [user, setUser] = useAtom(LoginUserAtom)

  const onLogin = () => {
    router.push('/login')
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
    <nav className="navbar">
      <div className="flex justify-center">
        {/*右側のコンテンツ*/}
        {isLogin ? (
          // ログインしている場合：Avatar画像
          <div className="flex items-center" onClick={onLogout}>
            <img src={user?.img ?? '/user.png'} alt="username" width={40} height={40} className="rounded-full" />
          </div>
        ) : (
          // ログインしていない場合
          <div className="flex justify-items-center ">
            <Link href="/login">
              <GrLogin onClick={onLogin} className="mr-2 text-3xl" />
            </Link>
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
