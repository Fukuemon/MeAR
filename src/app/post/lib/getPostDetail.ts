import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { PostDetailType } from '@/types/Post/types'

export const getPostDetail = async (id: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'post/' + id + '/'
  try {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      cache: 'no-cache'
    })
    if (!res.ok) {
      throw new Error('Failed to fetch post detail')
    }
    return res.json() as Promise<PostDetailType>
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch post detail')
  }
}
