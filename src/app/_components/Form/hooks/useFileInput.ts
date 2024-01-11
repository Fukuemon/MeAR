import { useState } from 'react'

// Fileを扱うためのカスタムフック
export const useFileInput = () => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      setFile(null)
      setPreview('')
      return
    }
    setPreview(window.URL.createObjectURL(file))
  }
  return {
    file,
    setFile,
    preview,
    setPreview,
    handleChangeFile
  }
}
