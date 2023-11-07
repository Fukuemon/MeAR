import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { Profile } from '@/types/Profile/types'

export const getMyProfile = async (accessToken: string): Promise<Profile> => {
  try {
    const res = await api.get<Profile>('profile/me/', {
      headers: {
        Authorization: `JWT ${accessToken}`
      }
    })
    console.log(res.data)
    return res.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch post list')
    throw error
  }
}
