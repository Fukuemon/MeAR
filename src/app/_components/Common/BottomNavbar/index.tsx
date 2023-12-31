'use client'
import React, { FC } from 'react'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { PiNotePencil } from 'react-icons/pi'
import { LoginUserAtom } from '@/app/(auth)/atom'
import { cn } from '@/libs/tailwind/utils'

type NavbarItem = {
  paths: string[]
  label: string
  icon: React.ReactNode
}
type BottomNavbarProps = {
  items: NavbarItem[]
  path: string
}

const excludedPaths = ['/login', '/sign-up']

export const BottomNavbar: FC<BottomNavbarProps> = ({ items, path }) => {
  if (excludedPaths.includes(path)) return null
  return (
    <div className="md:disabled: fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-center border bg-white">
      <ul className="relative flex w-full justify-between px-4">
        {items.map((item) => {
          const isActive = item.paths.includes(path)
          return (
            <li
              key={item.paths[0]}
              className={cn('flex flex-col items-center justify-center text-center mx-4 ', {
                'font-bold': isActive
              })}
            >
              <Link href={item.paths[0]} className="flex flex-col items-center justify-center text-sm ">
                {/* アイコン */}
                <span
                  className={cn('text-3xl text-primary transition-transform transform', {
                    'font-extrabold text-primary scale-110': isActive
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
  const myProfile = useAtomValue(LoginUserAtom)
  const myProfileId = myProfile?.id
  const myProfilePath = myProfileId ? `/profile/${myProfileId}` : '/login'
  const path = usePathname()
  const items: NavbarItem[] = [
    { paths: ['/'], label: 'Home', icon: <AiOutlineHome /> },
    { paths: ['/shop/search', '/post/create'], label: 'Post', icon: <PiNotePencil /> },
    { paths: [myProfilePath], label: 'Profile', icon: <AiOutlineUser /> }
  ]
  return <BottomNavbar items={items} path={path} />
}
