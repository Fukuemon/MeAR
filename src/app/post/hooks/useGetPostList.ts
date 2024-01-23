import { AxiosError } from 'axios'
import useSWR from 'swr'
import { fetcher } from '@/libs/fetcher/fetcher'
import { PostListApiResponse } from '@/types/Post/types'

export const useGetPostList = (pageId?: string) => {
  if (!pageId) {
    pageId = '1'
  }
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'post/?page=' + pageId
  console.log(url)
  const { data, error, isLoading, mutate } = useSWR<PostListApiResponse, AxiosError>(url, fetcher)
  console.log(data)

  return {
    postList: data,
    error,
    isLoading,
    mutate
  }
}
