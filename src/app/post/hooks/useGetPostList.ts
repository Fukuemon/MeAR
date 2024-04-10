import { AxiosError } from 'axios'
import useSWR from 'swr'
import { urlParams } from '@/constants/urlParams'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { PostListApiResponse } from '@/types/Post/types'

// fetcher関数は一つのオブジェクトを受け取り、そのプロパティからurlとtokenを取り出します。
export const fetcher = async (url: string, token: string): Promise<PostListApiResponse> => {
  try {
    let res
    if (token) {
      res = await api.get<PostListApiResponse>(url, {
        headers: {
          Authorization: `JWT ${token}`
        }
      })
    } else {
      res = await api.get<PostListApiResponse>(url)
    }
    return res.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch my profile')
    throw error
  }
}

export const useGetPostList = (pageId?: string, parameter?: string, token?: string) => {
  if (!pageId) {
    pageId = '1'
  }
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'post/?' + urlParams.page + pageId + parameter
  console.log(url)

  const { data, error, isLoading, mutate } = useSWR([url, token || ''], ([url, token]) => fetcher(url, token), {
    revalidateOnMount: true
  })

  console.log(data)
  return {
    postList: data,
    error,
    isLoading,
    mutate
  }
}
