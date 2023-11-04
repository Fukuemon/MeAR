import { PostDetailType } from '@/types/Post/types'

export const getPostDetail = async (id: string): Promise<PostDetailType> => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + `/post/${id}/`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch post detail')
  }

  return res.json() as Promise<PostDetailType>
}
