import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher/fetcher'

export const useGetPostByLiked = (profileId: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + `profile/${profileId}/posts/liked/`
  const { data, error, mutate } = useSWR(url, fetcher)

  return {
    likedPosts: data,
    errorLikedPost: error,
    mutateLikedPost: mutate
  }
}
