import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { PostDetailType } from '@/types/Post/types'

export const getPostDetail = async (id: string) => {
  try {
    const post = await api.get<PostDetailType>(`post/${id}/`)
    return post.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch post detail')
  }
}
