'use client'
import Link from 'next/link'
import Loading from '@/app/loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import AvatarInput from '../AvatarInput'
import { useSignUp } from './useSignUp'

export const SignUpForm = () => {
  const { form, onSubmit, imagePreview, handleImageChange, loading } = useSignUp()

  if (loading) return <Loading />
  return (
    <Form {...form}>
      <div className="flex max-w-md flex-col items-center">
        <h1 className="mb-4 text-center text-3xl font-bold text-primary">新規登録</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex flex-col items-center space-y-4">
            <FormField
              control={form.control}
              name="img"
              render={({ field }) => (
                <FormItem>
                  <AvatarInput
                    preview={imagePreview}
                    onImageChange={(e) => {
                      const file: File | undefined = e.target.files ? e.target.files[0] : undefined
                      if (!file) return
                      handleImageChange(e)
                      field.onChange(e.target.files)
                    }}
                    {...{ ...field }}
                  />
                </FormItem>
              )}
            />
            <div className="flex w-full flex-col items-center space-y-4">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="メールアドレス" type="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="パスワード" type="password" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder="ユーザー名" type="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col items-center space-y-4">
              <FormDescription>
                <Link className="text-blue-500 hover:underline" href="/login">
                  ログインの方はこちら
                </Link>
              </FormDescription>
              <Button type="submit" className="w-full">
                新規登録
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Form>
  )
}
