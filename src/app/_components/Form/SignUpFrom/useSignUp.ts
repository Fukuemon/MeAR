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
import { useAvatarInput } from '../AvatarInput/useAvatarInput'
import { handleSuccessfulLogin } from '../SignInForm/useLogin'
import { useCompressImage } from '../hooks/useCompressImage'

const FormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上です' }),
  username: z.string().optional(),
  img: z
    .custom<FileList>()
    .transform((file) => file[0])
    .nullable()
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
      img: null
    }
  })

  const { imageSrc, imagePreview, handleImageChange } = useAvatarInput()
  const { compressImage } = useCompressImage()

  const [loading, setLoading] = useState<boolean>(false)

  const appendSignUpFormData = async (formData: FormData, data: SignUpFormType) => {
    formData.append('email', data.email)
    formData.append('password', data.password)
    formData.append('username', data.username || 'anonymous')

    if (data.img) {
      // 画像圧縮処理
      const compressedImage = await compressImage(data.img, data.img.name)
      formData.append('img', compressedImage)
    }
  }

  const onSubmit = async (data: SignUpFormType) => {
    setLoading(true)
    try {
      console.log(data)
      const formData = new FormData()
      await appendSignUpFormData(formData, data)

      console.log(...formData)

      await api.post('account/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      const login = await api.post<LoginResponseType>('login/', { email: data.email, password: data.password })
      handleSuccessfulLogin(login.data, router)
      setUser(login.data.profile)
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
    imagePreview,
    handleImageChange,
    loading
  }
}
