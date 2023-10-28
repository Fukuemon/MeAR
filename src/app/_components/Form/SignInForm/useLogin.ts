import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { LoginResponseType } from '@/app/(auth)/types/AuthTypes'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'

export const handleSuccessfulLogin = (data: LoginResponseType, router: ReturnType<typeof useRouter>) => {
  localStorage.setItem('access', data.access)
  localStorage.setItem('refresh', data.refresh)
  console.log(data.access)
  router.push('/')
}

const LoginFormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上です' })
})

export type LoginFormType = z.infer<typeof LoginFormSchema>

export const useLoginForm = () => {
  const router = useRouter()

  const form = useForm<LoginFormType>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await api.post<LoginResponseType>('login/', data)
      handleSuccessfulLogin(res.data, router)
    } catch (error) {
      handleApiError(error as AxiosError, 'Login error:')
    }
  }

  return {
    form,
    onSubmit
  }
}
