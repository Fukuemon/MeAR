'use client'
import React, { FC } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineHome } from 'react-icons/ai'
import { AiOutlineUser } from 'react-icons/ai'
import { PiNotePencil } from 'react-icons/pi'
import { cn } from '@/libs/tailwind/utils'

type NavbarItem = {
  path: string
  label: string
  icon: React.ReactNode
}

type BottomNavbarProps = {
  items: NavbarItem[]
  path: string
}

export const BottomNavbar: FC<BottomNavbarProps> = ({ items, path }) => {
  return (
    <div className="md:disabled: fixed bottom-0 left-0 z-50 flex h-20 w-full items-center justify-center border bg-white">
      <ul className="relative flex w-full justify-between px-4">
        {items.map((item) => {
          const isActive = item.path === path
          return (
            <li
              key={item.path}
              className={cn('flex flex-col items-center justify-center text-center mx-4 ', {
                'font-bold': isActive
              })}
            >
              <Link href={item.path} className="flex flex-col items-center justify-center text-sm ">
                {/* アイコン */}
                <span
                  className={cn('text-3xl text-text transition-transform transform', {
                    'font-extrabold text-red scale-110': isActive
                  })}
                >
                  {item.icon}
                </span>
                {/* ラベル */}
                <span
                  className={cn({
                    'border-b-2': isActive // アクティブな状態の下線
                  })}
                >
                  {item.label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export const BottomNavbarContainer = () => {
  const path = usePathname()
  const items: NavbarItem[] = [
    { path: '/', label: 'Home', icon: <AiOutlineHome /> },
    { path: '/shop/search', label: 'Post', icon: <PiNotePencil /> },
    { path: '/profile', label: 'Profile', icon: <AiOutlineUser /> }
  ]
  return <BottomNavbar items={items} path={path} />
}
