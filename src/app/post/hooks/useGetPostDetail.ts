import { AxiosError } from 'axios'
import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher/fetcher'
import { PostDetailType } from '@/types/Post/types'

export const useGetPostDetail = (id: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'post/' + id + '/'
  const { data, error, mutate, isValidating } = useSWR<PostDetailType, AxiosError>(url, fetcher)

  return {
    mutate,
    error,
    post: data,
    isValidating
  }
}
