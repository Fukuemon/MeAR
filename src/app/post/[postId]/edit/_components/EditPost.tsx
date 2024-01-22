'use client'
import React, { ChangeEvent, Suspense, useState } from 'react'
import format from 'date-fns/format'
import { DatePicker } from '@/app/_components/Form/DatePicker'
import InputWithIcon from '@/app/_components/Form/InputWithIcon'
import MediaUpload from '@/app/_components/Form/MediaUpload/MediaUpload'
import { StarRating } from '@/app/_components/Form/StarRating/StarRating'
import Loading from '@/app/loading'
import Tag from '@/app/post/_components/Tag/Tag'
import { TagSelectModal } from '@/app/post/create/_components/TagSelectModal/TagSelectModal'
import { useGetTags } from '@/app/post/hooks/useGetTags'
import { Button } from '@/components/ui/button'
import { Form, FormControl, FormDescription, FormField, FormItem, FormMessage } from '@/components/ui/form'
import { Textarea } from '@/components/ui/textarea'
import { TagType } from '@/types/Post/types'
import { EditPostType } from '../page'
import { useEditPostForm } from './EditPost.hooks'

type EditPostProps = {
  post: EditPostType
}

export const EditPost = ({ post }: EditPostProps) => {
  const [selectedTags, setSelectTags] = useState<TagType[]>([])
  const { form, onSubmit, imagePreview, handleImageChange, modelPreview, handleModelChange, loading } =
    useEditPostForm(post)
  const { tags } = useGetTags()
  const selectTag = (tag: TagType[]) => {
    setSelectTags(tag)
    form.setValue(
      'tags',
      tag.map((t) => t.id)
    )
  }
  if (loading) return <Loading />
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
                    <DatePicker onChange={(date) => field.onChange(date ? format(date, 'yyyy-MM-dd') : '')} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Button type="submit" className="w-24 shadow-sm">
              編集
            </Button>
          </div>
          {/* 画像 */}
          <div className="flex items-center justify-center space-x-14 py-8">
            <div className="flex flex-col items-center justify-center gap-y-1">
              <FormField
                control={form.control}
                name="menu_photo"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MediaUpload
                        preview={imagePreview}
                        fileType="image/*"
                        icon="Image"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => {
                          const file: File | undefined = e.target.files ? e.target.files[0] : undefined
                          if (!file) return
                          handleImageChange(e)
                          field.onChange(e.target.files)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 写真が入力されているかで表示を変える */}
              <FormDescription>画像</FormDescription>
            </div>

            {/* 3Dファイル */}
            <div className="flex flex-col items-center justify-center gap-y-1">
              <FormField
                control={form.control}
                name="menu_model"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MediaUpload
                        preview={modelPreview}
                        fileType=".glb"
                        icon="FileBox"
                        onChange={(e) => {
                          const file: File | undefined = e.target.files ? e.target.files[0] : undefined
                          if (!file) return
                          handleModelChange(e)
                          field.onChange(e.target.files)
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              {/* 3Dファイルが入力されているかで表示を変える */}
              <FormDescription>3Dファイル</FormDescription>
            </div>
          </div>

          <div className="flex flex-col gap-y-6 py-4">
            {/* メニュー名 */}
            <FormField
              control={form.control}
              name="menu_name"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      type="text"
                      {...field}
                      icon="Utensils"
                      placeholder={post.menu_name ? post.menu_name : 'メニューを追加'}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 値段 */}
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <InputWithIcon
                      type="number"
                      {...field}
                      icon="JapaneseYen"
                      placeholder={post.price ? post.price.toString() : '値段を追加'}
                      className="w-full"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* 評価 */}
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

            {/* レビュー */}
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
      {/* tag */}
      <Suspense fallback={<Loading />}>
        {/* タグ一覧表示 */}
        {Array.isArray(tags) && <TagSelectModal tags={tags} onSelect={selectTag} />}
      </Suspense>

      {/* タグ表示 */}
      <div className="my-4  flex flex-wrap gap-2">
        {selectedTags && selectedTags.map((tag) => <Tag key={tag.id} name={tag.tag} />)}
      </div>
    </div>
  )
}
