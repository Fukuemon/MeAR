import { cookies } from 'next/headers'
import Link from 'next/link'
import { PostList } from '@/types/Post/types'
import Navbar from './_components/Common/Navbar/NavigationBar'
import { PostCardList } from './post/_components/CardList/PostCardList'
import { getPostList } from './post/lib/getPostList'

export default async function Home() {
  const postList: PostList = await getPostList()
  const cookiesList = cookies()
  const isLogin = cookiesList.has('access')

  return (
    <div>
      <Navbar isLogin={isLogin} />
      <main className="flex min-h-screen items-center justify-center p-16">
        <Link href="/post">
          <PostCardList postList={postList} />
        </Link>
      </main>
    </div>
  )
}
