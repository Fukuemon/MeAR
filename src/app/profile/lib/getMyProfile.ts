import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { ProfileType } from '@/types/Profile/types'

export const getMyProfile = async (accessToken: string): Promise<ProfileType> => {
  try {
    const res = await api.get<ProfileType>('profile/me/', {
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
