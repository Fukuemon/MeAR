import Link from 'next/link'
import PostCard from '@/app/post/_components/Card'
import { Mockdata } from '@/model/PostCard'
import Navbar from './_components/Common/Navbar'

export default function Home() {
  return (
    <div>
      <Navbar title="投稿一覧" />
      <main className="flex justify-center py-8">
        <Link href="/post/">
          <PostCard {...Mockdata} />
        </Link>
      </main>
    </div>
  )
}
