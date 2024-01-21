import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { PostList } from '@/types/Post/types'

export const getPostByProfileId = async (profileId: string) => {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'profile/' + profileId + '/posts/'
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 10 }
    })
    return res.json() as Promise<PostList>
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch profile detail')
  }
}
