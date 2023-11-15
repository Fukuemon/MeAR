'use client'
import format from 'date-fns/format'
import MediaUpload from '@/app/_components/Form/MediaUpload/MediaUpload'
import StarRating from '@/app/_components/Form/StarRating/StarRating'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { DatePicker } from '../../../../_components/Form/DatePicker'
import InputWithIcon from '../../../../_components/Form/InputWithIcon'
import { useCreatePostForm } from './CreatePost.hooks'

const CreatePost = () => {
  // メニューボックスのprops

  const { form, onSubmit } = useCreatePostForm()

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="w-full">
          <div className="flex justify-between">
            <FormField
              control={form.control}
              name="visited_date"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    {/* DatePickerにControllerからのfield.valueとfield.onChangeを渡す */}
                    <DatePicker onChange={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-24 shadow-sm">
              投稿
            </Button>
          </div>

          <div className="flex items-center justify-center space-x-14 py-8">
            <FormField
              control={form.control}
              name="menu_photo"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MediaUpload fileType="image/*" icon="Image" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="menu_model"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <MediaUpload fileType=".glb" icon="FileBox" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex flex-col gap-y-6 py-4">
            <FormField
              control={form.control}
              name="menu_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon {...field} icon="Utensils" placeholder="メニューを追加" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon {...field} icon="JapaneseYen" placeholder="値段を追加" className="w-full" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="score"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <StarRating {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="review_text"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Textarea className="w-full" placeholder="レビューを入力" rows={5} {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>

      {/* 評価 */}

      {/* tag */}
      <Button className="bg-green-500 text-white hover:bg-green-900"># タグを追加</Button>
    </div>
  )
}

export default CreatePost
