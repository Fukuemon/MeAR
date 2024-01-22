import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCompressImage } from '@/app/_components/Form/hooks/useCompressImage'
import { useFileInput } from '@/app/_components/Form/hooks/useFileInput'
import { useGetPostDetail } from '@/app/post/hooks/useGetPostDetail'
import { toast } from '@/components/ui/use-toast'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { EditPostType } from '../page'

const EditPostSchema = z.object({
  tags: z.array(z.number()),
  visited_date: z.string(),
  menu_name: z.string(),
  score: z.number(),
  price: z.coerce.number(),
  menu_photo: z
    .custom<FileList>()
    .transform((file) => file[0])
    .nullable(),
  menu_model: z
    .custom<FileList>()
    .transform((file) => file[0])
    .nullable()
    .optional(),
  review_text: z.string()
})

type EditPostFormType = z.infer<typeof EditPostSchema>

export const useEditPostForm = (post: EditPostType) => {
  console.log(post)
  const router = useRouter()
  const { mutate } = useGetPostDetail(post.id)
  const accessToken = getCookie('access')
  const [loading, setLoading] = useState<boolean>(false)
  const {
    file: imageFile,
    preview: imagePreview,
    setPreview: setImagePreview,
    handleChangeFile: handleImageChange,
    resetFile: resetImage
  } = useFileInput()
  const {
    file: modelFile,
    preview: modelPreview,
    setPreview: setModelPreview,
    handleChangeFile: handleModelChange,
    resetFile: resetModel
  } = useFileInput()
  const { compressImage } = useCompressImage()

  useEffect(() => {
    // 画像とモデルのプレビューを表示
    if (post.menu_photo) {
      setImagePreview(post.menu_photo)
    }
    if (post.menu_model) {
      setModelPreview(post.menu_model)
    }
  }, [])

  const appendEditPostFormData = async (formData: FormData, data: EditPostFormType) => {
    //tagsの処理
    if (data.tags) {
      data.tags.forEach((tag) => {
        formData.append('tags[]', tag.toString())
      })
    }
    //画像の処理
    if (data.menu_photo) {
      const compressedImage = await compressImage(data.menu_photo, data.menu_photo.name)
      formData.append('menu_photo', compressedImage)
    }
    //モデルの処理
    if (data.menu_model) {
      formData.append('menu_model', data.menu_model)
    }
    formData.append('visited_date', data.visited_date)
    formData.append('menu_name', data.menu_name)
    formData.append('score', data.score.toString())
    formData.append('price', data.price.toString())
    formData.append('review_text', data.review_text)
  }

  const form = useForm<EditPostFormType>({
    resolver: zodResolver(EditPostSchema),
    defaultValues: {
      // タグがある場合はidの配列に変換
      tags: post.tags?.map((tag) => tag.id) || [],
      visited_date: post.visited_date,
      menu_name: post.menu_name,
      score: post.score,
      price: post.price,
      menu_photo: null,
      menu_model: null,
      review_text: post.review_text
    }
  })

  const onSubmit = async (data: EditPostFormType) => {
    setLoading(true)
    try {
      const formData = new FormData()
      await appendEditPostFormData(formData, data)
      await api.patch(`post/${post.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${accessToken}`
        }
      })
      onSuccess()
    } catch (error) {
      handleApiError(error as AxiosError, 'Post create error:')
      onError(error as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  const onSuccess = () => {
    mutate()
    router.push(`/post/${post.id}`)
    toast({ title: '投稿を更新しました' })
    resetModel()
    resetImage()
  }

  const onError = (error: AxiosError) => {
    handleApiError(error, '投稿の更新に失敗しました')
  }

  return {
    form,
    onSubmit,
    loading,
    handleImageChange,
    handleModelChange,
    imageFile,
    imagePreview,
    modelFile,
    modelPreview
  }
}
