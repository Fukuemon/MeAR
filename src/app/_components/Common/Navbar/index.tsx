'use client'
import React, { FC, useState } from 'react'
import user from '/public/penguin.jpeg'
import Image from 'next/image'
import { GrLogin } from 'react-icons/gr'

type Props = {
  title: string
}

const Navbar: FC<Props> = (props) => {
  //ログイン状態の管理
  const [isLogin, setIsLogin] = useState(false)

  // ログインボタンを押したときの処理(ログイン画面に遷移する)
  const onLogin = () => {
    setIsLogin((preveState) => !preveState)
  }

  return (
    // ナビゲーションバー
    <nav className="navbar justify-between">
      <h2 className="font-bold">{props.title}</h2>
      <div className="flex justify-center">
        {/*右側のコンテンツ*/}

        {isLogin ? (
          // ログインしている場合：Avatar画像
          <div className="flex items-center">
            <Image src={user} alt="username" width={40} height={40} className="rounded-full" />
          </div>
        ) : (
          // ログインしていない場合
          <div className="flex justify-items-center ">
            {/* <Link href="/login"> */}
            <GrLogin onClick={onLogin} className="text-3xl mr-2" />
            {/* </Link> */}
          </div>
        )}
      </div>
    </nav>
  )
}

export default Navbar
