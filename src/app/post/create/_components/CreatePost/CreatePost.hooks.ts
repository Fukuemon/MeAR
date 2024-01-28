import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { format } from 'date-fns'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { useCompressImage } from '@/app/_components/Form/hooks/useCompressImage'
import { useFileInput } from '@/app/_components/Form/hooks/useFileInput'
import { SelectedShop, selectedShopAtom } from '@/app/shop/atom'
import { toast } from '@/components/ui/use-toast'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'

const RestaurantSchema = z.object({
  name: z.string(),
  address: z.string(),
  area: z.string(),
  lat: z.number(),
  lng: z.number(),
  url: z.string().url()
})

const PostCreateSchema = z.object({
  restaurant_data: RestaurantSchema,
  tags: z.array(z.number()),
  menu_name: z.string(),
  score: z.number().min(1).max(5),
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
  review_text: z.string(),
  visited_date: z.string()
})

type PostCreate = z.infer<typeof PostCreateSchema>

export const useCreatePostForm = () => {
  const {
    file: imageFile,
    preview: imagePreview,
    handleChangeFile: handleImageChange,
    resetFile: resetImage
  } = useFileInput()
  const {
    file: modelFile,
    preview: modelPreview,
    handleChangeFile: handleModelChange,
    resetFile: resetModel
  } = useFileInput()
  const [loading, setLoading] = useState<boolean>(false)
  const [selectedShop] = useAtom(selectedShopAtom)
  const { compressImage } = useCompressImage()
  const accessToken = getCookie('access')
  const router = useRouter()

  if (!selectedShop) {
    router.back()
    toast({ title: '店舗が選択されていません' })
    throw new Error('店舗が選択されていません')
  }

  const { name, address, lat, lng }: SelectedShop = selectedShop
  const area = selectedShop.large_area.name
  const url = selectedShop.urls.pc
  const restaurant = { name, address, area, lat, lng, url }
  const form = useForm<PostCreate>({
    resolver: zodResolver(PostCreateSchema),
    defaultValues: {
      restaurant_data: restaurant,
      tags: [],
      menu_name: '',
      score: 3,
      price: 800,
      menu_photo: null,
      menu_model: null,
      review_text: '',
      // TODO: 日付の初期値を今日にする
      visited_date: format(new Date(), 'yyyy-MM-dd')
    }
  })

  const onSubmit = async (data: PostCreate) => {
    setLoading(true)
    try {
      const formData = await createFormData(data)
      await postFormData(formData)
      onSuccess()
    } catch (error) {
      onError(error as AxiosError)
    } finally {
      setLoading(false)
    }
  }

  interface CustomFormData extends FormData {
    append<T extends string | Blob | number>(name: `${string}[]` | keyof PostCreate, value: T, fileName?: string): void
  }

  const createFormData = async (data: PostCreate): Promise<FormData> => {
    console.log(data.visited_date)
    const formData = new FormData() as CustomFormData
    Object.entries(data).forEach(([key, value]) => {
      if (key === 'menu_model' && (value === null || value === undefined)) {
        return // menu_model が null または undefined の場合は追加しない
      }
      if (key === 'menu_photo' && (value === null || value === undefined)) {
        return // menu_photo が null または undefined の場合は追加しない
      }
      appendFormData(formData, key as keyof PostCreate, value)
    })

    validateFormData(formData, 'menu_photo')
    validateFormData(formData, 'menu_model')

    // 画像圧縮処理
    if (imageFile && data.menu_photo) {
      const compressedImage = await compressImage(data.menu_photo as File, data.menu_photo.name)
      formData.append('menu_photo', compressedImage)
    }

    // 3Dモデル処理
    // TODO: 3Dモデルの圧縮
    if (modelFile && data.menu_model) {
      formData.append('menu_model', data.menu_model)
    }

    return formData
  }

  type FormDataValue =
    | string
    | number
    | { name: string; address: string; lat: number; lng: number; area: string; url: string }
    | number[]
    | File
    | null

  const appendFormData = (formData: CustomFormData, key: keyof PostCreate, value: FormDataValue) => {
    if (value === null) {
      return
    }
    if (key === 'menu_photo') {
      return
    }
    if (key === 'menu_model') {
      return
    }
    if (Array.isArray(value)) {
      value.forEach((v) => formData.append(`${key}[]`, v))
    } else if (value instanceof File) {
      formData.append(key, value)
    } else if (typeof value === 'object' && value !== null) {
      formData.append(key, JSON.stringify(value))
    } else {
      formData.append(key, value)
    }
  }

  const validateFormData = (formData: FormData, key: string) => {
    const value = formData.get(key)
    if (value === 'null' || value === null) {
      formData.delete(key)
    }
  }

  const postFormData = async (formData: FormData) => {
    await api.post('post/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `JWT ${accessToken}`
      }
    })
  }

  const onSuccess = () => {
    router.push('/')
    toast({ title: '投稿しました' })
    resetModel()
    resetImage()
  }

  const onError = (error: AxiosError) => {
    handleApiError(error, '投稿に失敗しました')
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
