import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { ProfileType } from '@/types/Profile/types'

export const getProfileById = async (id: string) => {
  try {
    const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/profile/${id}/`
    const profile = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      next: { revalidate: 10 }
    })
    if (!profile.ok) {
      throw new Error('Failed to fetch profile detail')
    }
    return profile.json() as Promise<ProfileType>
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch profile detail')
  }
}
