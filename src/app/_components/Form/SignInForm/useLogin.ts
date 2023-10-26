import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { api } from '@/libs/axios/instance'

const FormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上です' })
})

export type LoginFormType = z.infer<typeof FormSchema>

export const useLoginForm = () => {
  const router = useRouter()

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: ''
    }
  })

  const onSubmit = async (data: LoginFormType) => {
    try {
      const res = await api.post('login/', data)
      localStorage.setItem('access', res.data.access)
      localStorage.setItem('refresh', res.data.refresh)
      console.log(res.data.access)
      router.push('/')
    } catch (error) {
      console.error('Login error:', error)
    }
  }

  return {
    form,
    onSubmit
  }
}
