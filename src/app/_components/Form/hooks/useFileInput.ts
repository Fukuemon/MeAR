import { useState } from 'react'

// Fileを扱うためのカスタムフック
export const useFileInput = () => {
  const [file, setFile] = useState<File | null>(null)
  const [preview, setPreview] = useState<string>('')
  const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) {
      resetFile()
      return
    }
    setFile(file)
    setPreview(window.URL.createObjectURL(file))
  }
  const resetFile = () => {
    setFile(null)
    setPreview('')
  }

  return {
    file,
    setFile,
    preview,
    setPreview,
    handleChangeFile,
    resetFile
  }
}
