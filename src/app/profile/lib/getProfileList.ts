import { ProfileList } from '@/types/Profile/types'

export const getProfileList = async (): Promise<ProfileList> => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'profile/'
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
    next: { revalidate: 10 }
  })

  if (!res.ok) {
    throw new Error('Failed to fetch Profile list')
  }

  return res.json() as Promise<ProfileList>
}
