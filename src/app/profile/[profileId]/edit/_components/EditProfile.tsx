'use client'
import { getCookie } from 'cookies-next'
import AvatarInput from '@/app/_components/Form/AvatarInput'
import Loading from '@/app/loading'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Input } from '@/components/ui/input'
import { EditProfileType } from '@/types/Profile/types'
import { useEditProfile } from './EditProfile.hooks'

export type EditProfileProps = {
  profile: EditProfileType
}

export const EditProfile = ({ profile }: EditProfileProps) => {
  const accessToken = getCookie('access')?.toString()
  const currentProfile = profile as EditProfileType
  const { form, onSubmit, imagePreview, handleImageChange, loading } = useEditProfile(currentProfile, accessToken)
  if (loading) return <Loading />
  return (
    <Form {...form}>
      <div className="flex max-w-md flex-col items-center">
        <h1 className="mb-4 text-center text-xl font-bold text-primary">アバター画像</h1>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center space-y-8">
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
            <div className="flex w-full flex-col items-start">
              <h1 className="text-center text-sm font-bold text-primary">ユーザー名</h1>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem className="w-full">
                    <FormControl>
                      <Input placeholder={currentProfile.username} type="username" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex w-full flex-col items-center space-y-4">
              <Button type="submit" className="w-full">
                更新
              </Button>
            </div>
          </div>
        </form>
      </div>
    </Form>
  )
}
