'use client'
import React, { FC, useEffect, useState } from 'react'
import { useAtomValue } from 'jotai'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { AiOutlineHome, AiOutlineUser } from 'react-icons/ai'
import { PiNotePencil } from 'react-icons/pi'
import { LoginUserAtom } from '@/app/(auth)/atom'
import { handleToken } from '@/app/(auth)/lib/handleToken'
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

const excludedPaths = ['/login', '/sign-up']

export const BottomNavbar: FC<BottomNavbarProps> = ({ items, path }) => {
  if (excludedPaths.includes(path)) return null
  return (
    <div className="md:disabled: fixed bottom-0 left-0 z-50 flex h-16 w-full items-center justify-center border bg-white">
      <ul className="relative flex w-full justify-between px-4">
        {items.map((item, index) => {
          const isActive = item.path == path
          return (
            <li
              key={index}
              className={cn('flex flex-col items-center justify-center text-center mx-4 ', {
                'font-bold': isActive
              })}
            >
              <Link href={item.path} className="flex flex-col items-center justify-center text-sm ">
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
  const router = useRouter()
  const path = usePathname()
  const myProfile = useAtomValue(LoginUserAtom)
  const [myProfilePath, setMyProfilePath] = useState('/login/confirm')
  const [searchShopPath, setSearchShopPath] = useState('/shop/search')
  useEffect(() => {
    const updatePaths = () => {
      const newMyProfilePath = myProfile?.id ? `/profile/${myProfile.id}` : '/login/confirm'
      const newSearchShopPath = myProfile?.id ? '/shop/search' : '/login/confirm'
      setMyProfilePath(newMyProfilePath)
      setSearchShopPath(newSearchShopPath)
    }
    updatePaths()

    const checkLogin = async () => {
      if (path === myProfilePath || path === searchShopPath) {
        const isLoggedIn = await handleToken()
        if (!isLoggedIn) {
          router.push('/login/confirm')
        }
      }
    }

    checkLogin()
  }, [myProfile, path, myProfilePath, searchShopPath, router])

  const items: NavbarItem[] = [
    { path: '/', label: 'Home', icon: <AiOutlineHome /> },
    { path: searchShopPath, label: 'Post', icon: <PiNotePencil /> },
    { path: myProfilePath, label: 'Profile', icon: <AiOutlineUser /> }
  ]
  return <BottomNavbar items={items} path={path} />
}
