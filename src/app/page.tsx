import { Suspense } from 'react'
import { cookies } from 'next/headers'
import Navbar from './_components/Common/Navbar/NavigationBar'
import Loading from './loading'
import { PostCardList } from './post/_components/CardList/PostCardList'

export default async function Home() {
  const cookiesList = cookies()
  const isLogin = cookiesList.has('access')

  return (
    <div>
      <Navbar isLogin={isLogin} />
      <main className="flex items-center justify-center py-20">
        <Suspense fallback={<Loading />}>
          <PostCardList />
        </Suspense>
      </main>
    </div>
  )
}
