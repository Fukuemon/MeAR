'use client'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { useLoginForm } from './useLogin'

export const SignInForm = () => {
  const { form, onSubmit } = useLoginForm()

  return (
    <Form {...form}>
      <h1 className="items-center text-3xl font-bold text-main">ログイン</h1>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
        <div className="space-y-2 py-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="メールアドレスを入力してください" type="email" {...field} />
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
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="パスワードを入力してください" type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="flex flex-col space-y-4">
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
    </Form>
  )
}
