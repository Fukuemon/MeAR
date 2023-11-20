import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { TagType } from '@/types/Post/types'

export const getTagtypesList = async () => {
  try {
    const post = await api.get<TagType[]>(`post/tags/`)
    return post.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch post detail')
  }
}
