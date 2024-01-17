export const verifyAccessToken = async (accessToken: string) => {
  const url = process.env.NEXT_PUBLIC_BACKEND_URL + 'token/verify/'
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token: accessToken })
  })
  // responseが{}だったら、tureを返す
  if (res.status === 200) {
    return true
  } else {
    return false
  }
}
