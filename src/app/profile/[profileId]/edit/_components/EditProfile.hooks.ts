import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { AxiosError } from 'axios'
import { useAtom } from 'jotai'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { LoginUserAtom } from '@/app/(auth)/atom'
import { useAvatarInput } from '@/app/_components/Form/AvatarInput/useAvatarInput'
import { useCompressImage } from '@/app/_components/Form/hooks/useCompressImage'
import { useGetProfileById } from '@/app/profile/hooks/useGetProfileById'
import { toast } from '@/components/ui/use-toast'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { EditProfileType } from '@/types/Profile/types'

const EditProfileSchema = z.object({
  username: z.string(),
  img: z
    .custom<FileList>()
    .transform((file) => file[0])
    .nullable()
})

export type EditProfileFormType = z.infer<typeof EditProfileSchema>

export const useEditProfile = (profile: EditProfileType, accessToken?: string) => {
  const { mutateProfile } = useGetProfileById(profile.id)
  const router = useRouter()
  const [, setUser] = useAtom(LoginUserAtom)
  const { imageSrc, imagePreview, handleImageChange, setPreview } = useAvatarInput()
  useEffect(() => {
    setPreview(profile.img as string)
  }, [profile.img, setPreview])
  const { compressImage } = useCompressImage()
  const form = useForm<EditProfileFormType>({
    resolver: zodResolver(EditProfileSchema),
    defaultValues: {
      username: profile.username,
      img: null
    }
  })

  const [loading, setLoading] = useState<boolean>(false)

  const appendEditProfileFormData = async (formData: FormData, data: EditProfileFormType) => {
    formData.append('username', data.username)
    console.log(data.img)

    if (data.img) {
      // 画像圧縮処理
      const compressedImage = await compressImage(data.img, data.img.name)
      formData.append('img', compressedImage)
    }
  }

  const onSubmit = async (data: EditProfileFormType) => {
    setLoading(true)
    try {
      const formData = new FormData()
      await appendEditProfileFormData(formData, data)
      console.log(formData.get('img'))
      await api.patch(`profile/${profile.id}/`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `JWT ${accessToken}`
        }
      })
      const img = formData.get('img') as File
      const imgURL = img ? URL.createObjectURL(img) : null
      setUser((prev) => ({ ...prev, username: data.username, img: imgURL, id: profile.id })) // Convert 'img' to string
      toast({ title: 'プロフィールを更新しました' })
      mutateProfile()
      router.push(`/profile/${profile.id}`)
    } catch (error) {
      handleApiError(error as AxiosError, 'Failed to edit profile')
    } finally {
      setLoading(false)
    }
  }

  return {
    form,
    imageSrc,
    imagePreview,
    handleImageChange,
    onSubmit,
    loading
  }
}
