import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { LoginUserAtom } from '@/app/(auth)/atom'
import { LoginResponseType } from '@/app/(auth)/types/AuthTypes'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { useImageChange } from '../AvatarInput/useImageChange'
import { handleSuccessfulLogin } from './../SignInForm/useLogin'

const FormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上です' }),
  username: z.string().optional(),
  img: z.string().optional()
})

export type SignUpFormType = z.infer<typeof FormSchema>

export const useSignUp = () => {
  const [, setUser] = useAtom(LoginUserAtom)
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

  const { imageSrc, handleImageChange, getDefaultImageBlob } = useImageChange()

  const [loading, setLoading] = useState<boolean>(false)

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

      await api.post('account/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const login = await api.post<LoginResponseType>('login/', { email: data.email, password: data.password })

      handleSuccessfulLogin(login.data, router, setUser)
    } catch (error) {
      handleApiError(error as AxiosError, 'Login error:')
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
