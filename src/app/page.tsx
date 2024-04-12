'use client'
import { Suspense, useEffect, useState } from 'react'
import { getCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { urlParams } from '@/constants/urlParams'
import { verifyAccessToken } from './(auth)/lib/verifyAccessToken'
import { BottomNavbarContainer } from './_components/Common/BottomNavbar'
import FeedNavbar from './_components/Common/FeedNavbar/FeedNavigationBar'
import { selectedTabAtom } from './_components/Common/FeedNavbar/FeedTabs/FeedTabsAtom'
import Loading from './loading'
import { PostCardList } from './post/_components/CardList/PostCardList'

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  const pageId = searchParams.page || '1'
  const isLogin = getCookie('access') ? true : false
  const accessToken = getCookie('access')?.toString()
  const selectedTab = useAtom(selectedTabAtom)
  const [params, setParams] = useState('')

  useEffect(() => {
    const verifyAndSetParams = async () => {
      if (accessToken && (await verifyAccessToken(accessToken)) && selectedTab[0] == 'フォロー中のみ') {
        setParams(urlParams.following)
      } else {
        setParams('')
      }
    }

    verifyAndSetParams()
  }, [selectedTab, accessToken])

  return (
    <div>
      <FeedNavbar isLogin={isLogin} />
      <main className="flex items-center justify-center py-20">
        <Suspense fallback={<Loading />}>
          <PostCardList pageId={pageId} accessToken={accessToken} params={params} />
        </Suspense>
      </main>
      <BottomNavbarContainer />
    </div>
  )
}
