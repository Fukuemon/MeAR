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
  img: z.string().url().optional()
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

  const [imageSrc, setImageSrc] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files[0]) {
      setImageSrc(window.URL.createObjectURL(files[0]))
      form.setValue('img', window.URL.createObjectURL(files[0]))
    }
  }

  const onSubmit = async (data: SignUpFormType) => {
    try {
      const formData = new FormData()
      formData.append('email', data.email)
      formData.append('password', data.password)
      if (data.username) {
        formData.append('username', data.username)
      }
      const imageInput = document.querySelector('input[type="file"]') as HTMLInputElement
      if (imageInput.files && imageInput.files[0]) {
        formData.append('img', imageInput.files[0])
      }

      const res = await api.post('account/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      })
      const login = await api.post('login/', { email: data.email, password: data.password })
      localStorage.setItem('refresh', login.data.refresh)
      localStorage.setItem('access', login.data.access)
      router.push('/')
      console.log(res.data)
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return {
    form,
    onSubmit,
    imageSrc,
    handleImageChange
  }
}
