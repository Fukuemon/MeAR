import { useState } from 'react'

export const useImageChange = () => {
  const [imageSrc, setImageSrc] = useState<string>('/user.png')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files[0]) {
      const imageURL = window.URL.createObjectURL(files[0])
      setImageSrc(imageURL)
    }
  }

  const getDefaultImageBlob = async (): Promise<Blob | null> => {
    try {
      const response = await fetch('/user.png')
      if (!response.ok) throw new Error('Network response was not ok')
      return await response.blob()
    } catch (error) {
      console.error('Failed to fetch the default user.png', error)
      return null
    }
  }

  return {
    imageSrc,
    handleImageChange,
    getDefaultImageBlob
  }
}
