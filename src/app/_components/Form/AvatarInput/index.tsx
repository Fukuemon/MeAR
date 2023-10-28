import { ChangeEvent, FC } from 'react'
import Image from 'next/image'
import user from 'public/user.png'

interface AvatarInputProps {
  imageSrc: string
  onImageChange: (e: ChangeEvent<HTMLInputElement>) => void
}

const AvatarInput: FC<AvatarInputProps> = ({ imageSrc, onImageChange }) => {
  return (
    <div className="relative">
      <div className="h-32 w-32 overflow-hidden rounded-full bg-blue-200">
        {imageSrc ? (
          <img src={imageSrc} alt="Uploaded avatar" className="h-full w-full object-cover" />
        ) : (
          <Image src={user} alt="User avatar" width={128} height={128} />
        )}
      </div>
      <input
        type="file"
        accept="image/*"
        onChange={onImageChange}
        className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
      />
    </div>
  )
}

export default AvatarInput
