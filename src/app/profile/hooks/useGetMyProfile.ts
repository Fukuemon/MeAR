import { AxiosError } from 'axios'
import useSWR from 'swr'
import { handleApiError } from '@/libs/axios/handleError'
import { api } from '@/libs/axios/instance'
import { ProfileType } from '@/types/Profile/types'

// fetcher関数は一つのオブジェクトを受け取り、そのプロパティからurlとtokenを取り出します。
export const fetcher = async (url: string, token: string): Promise<ProfileType> => {
  try {
    const res = await api.get<ProfileType>(url, {
      headers: {
        Authorization: `JWT ${token}`
      }
    })
    return res.data
  } catch (error) {
    handleApiError(error as AxiosError, 'Failed to fetch my profile')
    throw error
  }
}

export const useGetMyProfile = (token: string) => {
  // useSWRフックにキーとしてオブジェクトを渡します。fetcher関数がこの形式を期待しているためです。
  const {
    data: profile,
    error,
    isValidating
  } = useSWR(['profile/me/', token], ([url, token]) => fetcher(url, token), { revalidateOnMount: true })

  return {
    profile,
    error,
    isLoading: isValidating
  }
}
