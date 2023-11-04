import Image from 'next/image'
import user from '/public/penguin.jpeg'
import { FC } from 'react'

type Props = {
  author: string
  visited_date: string
}

export const PostHeader: FC<Props> = ({ author, visited_date }) => {
  return (
    <div className="card-header">
      {/* 左側：ユーザー紹鴎*/}
      <div className="flex items-center">
        <Image src={user} className="rounded-full " alt="ユーザーアイコン" width={40} height={40} />
        <h2 className="font-bold">{author}</h2>
      </div>

      {/* 日付 */}
      <h2 className="pr-4 text-xl font-bold ">{visited_date}</h2>
    </div>
  )
}
