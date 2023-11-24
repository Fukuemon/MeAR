import { AxiosError } from 'axios'
import useSWR from 'swr'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { TagType } from '@/types/Post/types'

const fetcher = async (url: string): Promise<TagType[]> => {
  try {
    const res = await api.get<TagType[]>(url)
    return res.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch tags')
    throw error
  }
}

export const useGetTags = () => {
  const { data, error, isLoading } = useSWR<TagType[], AxiosError>('post/tags/', fetcher)

  return {
    tags: data,
    error,
    isLoading
  }
}
