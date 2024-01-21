import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'

export const getProfileById = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${id}/`
    const profile = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        cache: 'no-cache'
      }
    })
    if (!profile.ok) {
      throw new Error('Failed to fetch profile detail')
    }
    return profile.json()
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch profile detail')
  }
}
