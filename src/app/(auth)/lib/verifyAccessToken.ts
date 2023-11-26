export const verifyAccessToken = async (accessToken: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'token/verify/'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ access: accessToken })
  })
  if (!res.ok) {
    throw new Error('Failed to verify access token')
  }
  const data = await res.json()
  return data.access
}
