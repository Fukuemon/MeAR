import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { ProfileType } from '@/types/Profile/types'

export const getProfileById = async (id: string) => {
  try {
    const profile = await api.get<ProfileType>(`profile/${id}/`)
    return profile.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch profile detail')
  }
}
