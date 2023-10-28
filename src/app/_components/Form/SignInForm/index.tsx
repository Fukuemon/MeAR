'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginForm } from './useLogin'

export const SignInForm = () => {
  const { form, onSubmit } = useLoginForm()

  return (
    <Form {...form}>
      <div className="flex max-w-md flex-col items-center">
        <h1 className="mb-4 text-center text-3xl font-bold text-main">ログイン</h1>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="mt-8 flex w-full flex-col space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
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
                <FormItem>
                  <FormControl>
                    <Input placeholder="パスワード" type="password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="mt-4 flex w-full flex-col items-center space-y-4">
            <FormDescription>
              <Link className="text-blue-500 hover:underline" href="/sign-up">
                新規登録の方はこちら
              </Link>
            </FormDescription>
            <Button type="submit" className="w-full">
              ログイン
            </Button>
          </div>
        </form>
      </div>
    </Form>
  )
}
