import { PostList } from '@/types/Post/types'

export const getPostList = async (): Promise<PostList> => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'post/'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    cache: 'no-cache'
  })

  if (!res.ok) {
    throw new Error('Failed to fetch post list')
  }

  return res.json() as Promise<PostList>
}
