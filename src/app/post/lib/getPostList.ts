import { PostList } from '@/types/Post/types'

export const getPostList = async (): Promise<PostList> => {
  const url = `http://localhost:8000/post/`
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 10 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch post list')
  }

  return res.json() as Promise<PostList>
}
