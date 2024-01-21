import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { ProfileType } from '@/types/Profile/types'

export const getMyProfile = async (accessToken: string): Promise<ProfileType> => {
  try {
    const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'profile/me/'
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `JWT ${accessToken}`
      }
    })
    return res.json() as Promise<ProfileType>
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch post list')
    throw error
  }
}
