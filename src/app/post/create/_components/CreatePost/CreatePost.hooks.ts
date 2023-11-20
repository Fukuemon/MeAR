import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { getCookie } from 'cookies-next'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Shop, selectedShopAtom } from '@/app/shop/atom'
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
  restaurant: RestaurantSchema,
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
  const [imageSrc, setImageSrc] = useState<File>()
  const [modelSrc, setModelSrc] = useState<File>()
  const accessToken = getCookie('access')
  const router = useRouter()

  const [loading, setLoading] = useState<boolean>(false)
  const [selectedShop] = useAtom(selectedShopAtom)
  if (!selectedShop) {
    router.back()
    throw new Error('No shop selected')
  }
  const { id, name, address, lat, lng }: Shop = selectedShop
  const area = selectedShop.large_area.name
  const url = selectedShop.urls.pc
  const restaurant = { id, name, address, area, lat, lng, url }
  console.log(restaurant)
  const form = useForm<PostCreate>({
    resolver: zodResolver(PostCreateSchema),
    defaultValues: {
      restaurant: restaurant,
      tags: [],
      menu_name: '',
      score: 3,
      price: 800,
      menu_photo: null,
      menu_model: null,
      review_text: '',
      visited_date: ''
    }
  })

  const appendCreatePostFormData = async (formData: FormData, data: PostCreate) => {
    formData.append('restaurant', JSON.stringify(data.restaurant))
    formData.append('tags', JSON.stringify(data.tags))
    formData.append('menu_name', data.menu_name)
    formData.append('score', data.score.toString())
    formData.append('price', data.price.toString())
    formData.append('review_text', data.review_text)
    formData.append('visited_date', data.visited_date)
  }

  const onSubmit = async (data: PostCreate) => {
    setLoading(true)
    try {
      const formData = new FormData()
      await appendCreatePostFormData(formData, data)
      if (imageSrc) {
        formData.append('menu_photo', imageSrc)
      }
      if (modelSrc) {
        formData.append('menu_model', modelSrc)
      }
      console.log(formData.getAll('menu_photo'))
      console.log(formData.getAll('menu_model'))
      await api.post('post/', formData, {
        headers: { 'Content-Type': 'multipart/form-data', Authorization: `JWT ${accessToken}` }
      })
      router.push('/')
      toast({ title: '投稿しました' })
    } catch (error) {
      handleApiError(error as AxiosError, '投稿に失敗しました')
    }
    setLoading(false)
  }

  return { form, onSubmit, loading, imageSrc, setImageSrc, modelSrc, setModelSrc }
}
