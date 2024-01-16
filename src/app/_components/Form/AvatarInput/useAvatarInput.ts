import { useEffect } from 'react'
import { useFileInput } from '../hooks/useFileInput'

export const useAvatarInput = () => {
  const { file: imageSrc, setPreview, preview: imagePreview, handleChangeFile: handleImageChange } = useFileInput()
  useEffect(() => {
    setPreview('/user.png')
  }, [])

  return {
    imageSrc,
    imagePreview,
    handleImageChange
  }
}
