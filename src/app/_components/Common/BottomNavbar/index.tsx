'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { AiOutlineHome } from 'react-icons/ai'
import { BiUser } from 'react-icons/bi'
import { PiNotePencil } from 'react-icons/pi'

// ボトムナビゲーションバー：画面下に固定し、それぞれの画面に遷移する
const BottomNavbar = () => {
  //　メニューアイコンの定義
  const Menus = [
    { name: 'Home', icon: <AiOutlineHome />, dis: 'translate-x-0', link: '/' },
    {
      name: 'Post',
      icon: <PiNotePencil />,
      dis: 'translate-x-16',
      link: '/shop/search'
    },
    {
      name: 'Profile',
      icon: <BiUser />,
      dis: 'translate-x-32',
      link: '/profile'
    }
  ]
  const [active, setActive] = useState(0)

  return (
    // ボトムナビゲーションバー
    // メニューの数だけループして、それぞれのメニューを表示する
    <div className="fixed bottom-0 left-0 z-50 h-16  w-full rounded-t-xl bg-orange-100 px-6">
      <ul className="relative flex justify-between">
        {Menus.map((menu, i) => (
          <li key={i} className="">
            <Link
              href={menu.link}
              className="flex flex-col items-center justify-center text-center "
              onClick={() => setActive(i)}
            >
              <span
                className={`cursor-pointer text-5xl text-text duration-500 ${
                  i === active && '-mt-6 rounded-full border-t-2 border-gray-200 bg-orange-100 p-4 pb-0'
                }`}
              >
                {menu.icon}
                <span className="h-16 w-16 rounded-full bg-white"></span>
              </span>
              <span className={`${active === i ? ` opacity-100 duration-700 ` : `translate-y-10 opacity-0`}`}>
                {menu.name}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BottomNavbar
