import { AxiosError } from 'axios'
import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher/fetcher'
import { PostListItem } from '@/types/Post/types'

export const useGetPostList = () => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'post/'
  const { data, error, isLoading, mutate } = useSWR<PostListItem[], AxiosError>(url, fetcher)

  return {
    postList: data,
    error,
    isLoading,
    mutate
  }
}
