import React from 'react'
import { Heart } from 'lucide-react'
import ModelViewer from '@/app/post/_components/ModelViewer'

type Props = {
  menuPhoto: string
  menuModel?: string | null
  isModel: boolean
  postId: string
  isLike: boolean
  isAuthor?: boolean
  onClickLike: () => void
  isLogin?: boolean
}

export default function ImageOrModelViewer({
  menuPhoto,
  menuModel,
  isModel,
  isLike,
  isAuthor,
  onClickLike,
  isLogin
}: Props) {
  return (
    <div className="relative z-0">
      {isModel && menuModel ? (
        <div className="flex items-center justify-center">
          <div className=" h-80 w-full">
            <ModelViewer src={menuModel} />
          </div>
        </div>
      ) : (
        <img src={menuPhoto} width={500} height={400} className="h-full w-full object-cover" alt={menuPhoto} />
      )}
      {!isAuthor && isLogin && (
        <span className="absolute right-4 top-2 z-10">
          <Heart
            onClick={onClickLike}
            className={`h-10 w-10 fill-current  ${
              isLike ? 'text-primary hover:text-primary/50' : 'text-gray-400 hover:text-gray-400/50'
            }`}
          />
        </span>
      )}
    </div>
  )
}
