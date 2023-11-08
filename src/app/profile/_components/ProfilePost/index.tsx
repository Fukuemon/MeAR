import React from 'react'
import { Heart } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { PostListItem } from '@/types/Post/types'

const ProfilePost = (post: PostListItem) => {
  return (
    <Link href={`/post/${post.id}`} className="group relative">
      <Image src={post.menu_photo} alt="post" width={200} height={200} className="h-28 w-28 rounded-lg object-cover" />
      {/* いいね、コメント */}
      {post.likes && post.likes.length > 0 ? (
        <div className="absolute left-1 top-1 z-10 h-full">
          <p className="flex items-center text-xs font-bold text-white">
            <Heart className="fill-current text-sm text-primary " />
            <span>{post.likes.length}</span>
          </p>
        </div>
      ) : null}
    </Link>
  )
}

export default ProfilePost
