import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

const FormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上です' }),
  username: z.string().optional(),
  image: z.string().url().optional()
})

export type SignUpFormType = z.infer<typeof FormSchema>

export const useSignUp = () => {
  const form = useForm<SignUpFormType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: '',
      password: '',
      username: '',
      image: ''
    }
  })

  const [imageSrc, setImageSrc] = useState<string>('')

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { files } = e.target
    if (files && files[0]) {
      setImageSrc(window.URL.createObjectURL(files[0]))
      form.setValue('image', window.URL.createObjectURL(files[0]))
    }
  }

  function onSubmit(data: SignUpFormType) {
    console.log(data)
  }

  return {
    form,
    onSubmit,
    imageSrc,
    handleImageChange
  }
}
