import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher/fetcher'

export const useGetPostByProfileId = (profileId: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + `profile/${profileId}/posts/`
  const { data, error, mutate } = useSWR(url, fetcher)

  return {
    posts: data,
    profilePostError: error,
    mutateProfilePost: mutate
  }
}
