import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { api } from '@/libs/axios/instance'

const FormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上です' }),
  username: z.string().optional(),
  img: z.string().optional()
})

export type SignUpFormType = z.infer<typeof FormSchema>

export const useSignUp = () => {
  const router = useRouter()
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      img: ''
    }
  })

  const [imageSrc, setImageSrc] = useState<string>('/user.png')
  const [loading, setLoading] = useState<boolean>(false)

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files[0]) {
      const imageURL = window.URL.createObjectURL(files[0])
      setImageSrc(imageURL)
      form.setValue('img', imageURL)
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

  const appendSignUpFormData = async (formData: FormData, data: SignUpFormType, file: File | null) => {
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('username', data.username || 'anonymous')

    if (file) {
      formData.append('img', file)
    } else {
      const blob = await getDefaultImageBlob()
      if (blob) formData.append('img', blob, 'user.png')
    }
  }

  const onSubmit = async (data: SignUpFormType) => {
    setLoading(true)
    try {
      const formData = new FormData()
      const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement
      await appendSignUpFormData(formData, data, imageInput.files?.[0] || null)

      const res = await api.post('account/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      const login = await api.post('login/', { email: data.email, password: data.password })

      localStorage.setItem('refresh', login.data.refresh)
      localStorage.setItem('access', login.data.access)
      router.push('/')
      console.log(res.data)
    } catch (error) {
      console.error(error)
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    onSubmit,
    imageSrc,
    handleImageChange,
    loading
  }
}
