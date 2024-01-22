import { AxiosError } from 'axios'
import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher/fetcher'
import { ProfileType } from '@/types/Profile/types'

export const useGetProfileById = (profileId: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + `profile/${profileId}/`
  const { data, error, mutate } = useSWR<ProfileType, AxiosError>(url, fetcher)

  return {
    profile: data,
    error,
    mutateProfile: mutate
  }
}
