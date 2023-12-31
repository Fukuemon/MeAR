export const getRefreshAccessToken = async (refreshToken: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'token/refresh/'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ refresh: refreshToken })
  })
  if (!res.ok) {
    throw new Error('Failed to refresh access token')
  }
  const data = await res.json()
  return data.access
}
