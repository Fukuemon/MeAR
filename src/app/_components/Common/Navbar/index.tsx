'use client'
import React, { FC } from 'react'
import user from '/public/penguin.jpeg'
import { deleteCookie } from 'cookies-next'
import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { GrLogin } from 'react-icons/gr'

type Props = {
  isLogin: boolean
}

const Navbar: FC<Props> = ({ isLogin }) => {
  const router = useRouter()

  const onLogin = () => {
    router.push('/login')
  }

  const onLogout = () => {
    deleteCookie('access')
    deleteCookie('refresh')
    // setIsLogin(false)
    router.push('/login')
  }

  return (
    // ナビゲーションバー
    <nav className="navbar">
      <div className="flex justify-center">
        {/*右側のコンテンツ*/}
        {isLogin ? (
          // ログインしている場合：Avatar画像
          <div className="flex items-center" onClick={onLogout}>
            <Image src={user} alt="username" width={40} height={40} className="rounded-full" />
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
