import { cookies } from 'next/headers'
import Link from 'next/link'
import PostCard from '@/app/post/_components/Card'
import { Mockdata } from '@/model/PostCard'
import Navbar from './_components/Common/Navbar'

export default function Home() {
  const cookiesList = cookies()
  const isLogin = cookiesList.has('accessToken')
  return (
    <div>
      <Navbar isLogin={isLogin} />
      <main className="flex justify-center py-8">
        <Link href="/post/">
          <PostCard {...Mockdata} />
        </Link>
      </main>
    </div>
  )
}
