'use client'
import { useEffect } from 'react'
import { deleteCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { RESET } from 'jotai/utils'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { LoginUserAtom } from '../../atom'

export const LoginConfirm = () => {
  const [, setUser] = useAtom(LoginUserAtom)
  useEffect(() => {
    deleteCookie('access')
    deleteCookie('refresh')
    deleteCookie('loginUserId')
    setUser(RESET)
  }, [])

  return (
    <div className="flex flex-col items-center justify-center space-y-8">
      <h1 className="mb-4 text-center text-2xl font-bold text-primary">ログインが必要です</h1>
      <Link href="/login">
        <Button className="w-40">ログインする</Button>
      </Link>
      <Link href="/">
        <Button className="w-40  bg-yellow-400 hover:bg-yellow-300">投稿一覧画面へ戻る</Button>
      </Link>
    </div>
  )
}
