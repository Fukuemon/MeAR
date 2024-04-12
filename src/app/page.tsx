'use client'
import { Suspense, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { urlParams } from '@/constants/urlParams'
import { cn } from '@/libs/tailwind/utils'
import { verifyAccessToken } from './(auth)/lib/verifyAccessToken'
import { BottomNavbarContainer } from './_components/Common/BottomNavbar'
import FeedNavbar from './_components/Common/FeedNavbar/FeedNavigationBar'
import { selectedTabAtom } from './_components/Common/FeedNavbar/FeedTabs/FeedTabsAtom'
import Loading from './loading'
import { PostCardList } from './post/_components/CardList/PostCardList'

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  const pageId = searchParams.page || '1'
  const selectedTab = useAtom(selectedTabAtom)
  const [params, setParams] = useState('')
  const [accessToken, setAccessToken] = useState<string | undefined>('')
  const isLogin = accessToken ? true : false

  useEffect(() => {
    const verifyAndSetParams = async () => {
      const accessToken = getCookie('access')?.toString()
      if (accessToken) setAccessToken(accessToken)
      if (accessToken && (await verifyAccessToken(accessToken)) && selectedTab[0] == 'フォロー中のみ') {
        setParams(urlParams.following)
      } else {
        setParams('')
      }
    }

    verifyAndSetParams()
  }, [selectedTab, accessToken])

  return (
    <>
      <FeedNavbar isLogin={isLogin} accessToken={accessToken} />
      <main className={cn('flex items-center justify-center py-20', isLogin && 'py-40')}>
        <Suspense fallback={<Loading />}>
          <PostCardList pageId={pageId} accessToken={accessToken} params={params} />
        </Suspense>
      </main>
      <BottomNavbarContainer />
    </>
  )
}
