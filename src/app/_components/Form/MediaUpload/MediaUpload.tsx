import React from 'react'
import { icons } from 'lucide-react'
import { Input } from '@/components/ui/input'

type Props = {
  fileType: string
  icon: keyof typeof icons
}

export default function MediaUpload({ fileType, icon }: Props) {
  const LucideIcon = icons[icon]

  return (
    <div className="flex flex-col items-center justify-center">
      <label className="flex h-32 w-32 cursor-pointer flex-col items-center rounded-lg border bg-gray-50 px-4 py-6 uppercase tracking-wide text-blue-500 shadow-lg hover:bg-gray-300">
        <LucideIcon className="" />
        <Input type="file" className="hidden" accept={fileType} />
      </label>
      <p className="pt-2 text-sm text-gray-500">{fileType === 'image/*' ? '画像を追加' : '3Dファイルを追加'}</p>
    </div>
  )
}
