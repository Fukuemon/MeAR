import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher/fetcher'

export const useGetProfileById = (profileId: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + `profile/${profileId}/`
  const { data, error, mutate } = useSWR(url, fetcher)

  return {
    profile: data,
    error,
    mutateProfile: mutate
  }
}
