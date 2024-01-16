import { FC } from 'react'
import Link from 'next/link'

type Props = {
  author: string
  visited_date: string
  author_img?: string | null
  author_id: string
}

export const PostHeader: FC<Props> = ({ author, visited_date, author_img, author_id }) => {
  const link = author_id ? `/profile/${author_id}` : '/'
  return (
    <div className="card-header">
      {/* 左側：ユーザー紹鴎*/}
      <Link href={link}>
        <div className="flex items-center">
          <img
            src={author_img ?? '/user.png'}
            className="rounded-full "
            alt="ユーザーアイコン"
            width={40}
            height={40}
          />
          <h2 className="font-bold">{author}</h2>
        </div>
      </Link>

      {/* 日付 */}
      <h2 className="pr-4 text-xl font-bold ">{visited_date}</h2>
    </div>
  )
}
