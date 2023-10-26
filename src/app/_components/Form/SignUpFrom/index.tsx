'use client'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AvatarInput from '../AvatarInput'

const FormSchema = z.object({
  email: z.string().email({ message: 'メールアドレスの形式が正しくありません' }),
  password: z.string().min(6, { message: 'パスワードは6文字以上です' }),
  username: z.string().optional(),
  image: z.string().url().optional()
})

export type SignUpFormType = z.infer<typeof FormSchema>

export const SignUpForm = () => {
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

  return (
    <Form {...form}>
      <h1 className="items-center text-center text-3xl font-bold text-main">新規登録</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="flex w-auto flex-col items-center space-y-8 py-4 lg:max-w-xl">
          <FormField
            control={form.control}
            name="image"
            render={() => (
              <FormItem>
                <AvatarInput imageSrc={imageSrc} onImageChange={handleImageChange} />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="メールアドレス" type="email" className="w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="パスワード" type="password" className="w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="ユーザー名" type="username" className="w-64" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col space-y-4 ">
          <FormDescription>
            <Link className="text-blue-500 hover:underline" href="/login">
              ログインの方はこちら
            </Link>
          </FormDescription>
          <Button type="submit" className="w-full">
            新規登録
          </Button>
        </div>
      </form>
    </Form>
  )
}
