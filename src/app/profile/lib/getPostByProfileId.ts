import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { PostList } from '@/types/Post/types'

export const getPostByProfileId = async (profileId: string) => {
  try {
    const profile = await api.get<PostList>(`profile/${profileId}/posts/`)
    return profile.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch profile detail')
  }
}
