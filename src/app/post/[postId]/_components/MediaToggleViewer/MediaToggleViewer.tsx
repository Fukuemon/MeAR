import React, { useState } from 'react'
import { Heart } from 'lucide-react'
import ModelViewer from '@/app/post/_components/ModelViewer'

type Props = {
  menuPhoto: string
  menuModel?: string | null
  isModel: boolean
}

export default function ImageOrModelViewer({ menuPhoto, menuModel, isModel }: Props) {
  const [isLike, setIsLike] = useState(false)
  // いいねボタンを押したときの処理
  const onClickLike = () => {
    setIsLike((preveState) => !preveState)
  }
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

      <span className="absolute right-4 top-2">
        <Heart
          onClick={onClickLike}
          className={`h-10 w-10 fill-current ${isLike ? 'text-primary' : 'text-gray-400'}`}
        />
      </span>
    </div>
  )
}
