'use client'
import React from 'react'
import { icons } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Props = {
  image?: string
  fileType: string
  icon: keyof typeof icons
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// React.forwardRefを使用してコンポーネントをラップ
const MediaUpload = React.forwardRef<HTMLInputElement, Props>(({ fileType, icon, onChange, image }, ref) => {
  const LucideIcon = icons[icon]

  return (
    <div className="flex flex-col items-center justify-center">
      {
        /* 画像が入力されているかで表示を変える */
        image ? (
          <img src={image} alt="image" className="h-32 w-32" />
        ) : (
          <label className="flex h-32 w-32 cursor-pointer flex-col items-center rounded-lg border bg-gray-50 px-4 py-6 uppercase tracking-wide text-blue-500 shadow-lg hover:bg-gray-300">
            <LucideIcon />
            <Input type="file" className="hidden" accept={fileType} ref={ref} onChange={onChange} />
          </label>
        )
      }
    </div>
  )
})

MediaUpload.displayName = 'MediaUpload'

export default MediaUpload
