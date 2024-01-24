'use client'
import { Suspense } from 'react'
import { hasCookie } from 'cookies-next'
import Navbar from './_components/Common/Navbar/NavigationBar'
import Loading from './loading'
import { PostCardList } from './post/_components/CardList/PostCardList'

export default function Home({ searchParams }: { searchParams: { page: string } }) {
  const pageId = searchParams.page || '1'
  const isLogin = hasCookie('access')

  return (
    <div>
      <Navbar isLogin={isLogin} />
      <main className="flex items-center justify-center py-20">
        <Suspense fallback={<Loading />}>
          <PostCardList pageId={pageId} />
        </Suspense>
      </main>
    </div>
  )
}
