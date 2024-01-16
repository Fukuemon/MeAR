'use client'
import React from 'react'
import clsx from 'clsx'
import { icons } from 'lucide-react'
import ModelViewer from '@/app/post/_components/ModelViewer'
import { Input } from '@/components/ui/input'

type Props = {
  preview: string
  fileType: string
  icon: keyof typeof icons
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

// React.forwardRefを使用してコンポーネントをラップ
const MediaUpload = React.forwardRef<HTMLInputElement, Props>(
  ({ fileType, icon, onChange, preview, ...props }, ref) => {
    const LucideIcon = icons[icon]

    return (
      <div className="flex flex-col items-center justify-center">
        <label>
          <Input type="file" className="hidden" accept={fileType} ref={ref} onChange={onChange} {...props} />
          <div className="relative m-2 h-32 w-32 border">
            {preview ? (
              fileType === 'image/*' ? (
                <img src={preview} alt={preview} className="h-full w-full object-cover" />
              ) : (
                <div className="h-32 w-32">
                  <ModelViewer src={preview} />
                </div>
              )
            ) : (
              <div
                className={clsx(
                  'flex h-32 w-32 cursor-pointer flex-col items-center rounded-lg border bg-gray-50 px-4 py-6 uppercase tracking-wide text-blue-500 shadow-lg hover:bg-gray-300'
                )}
              >
                <LucideIcon />
              </div>
            )}
          </div>
        </label>
      </div>
    )
  }
)

MediaUpload.displayName = 'MediaUpload'

export default MediaUpload
