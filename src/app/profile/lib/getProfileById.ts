import { AxiosError } from 'axios'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { Profile } from '@/types/Profile/types'

export const getProfileById = async (id: string) => {
  try {
    const profile = await api.get<Profile>(`profile/${id}/`)
    return profile.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch profile detail')
  }
}
