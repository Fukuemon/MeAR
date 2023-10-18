export const getProfileList = async (userId: string) => {
  const res = await fetch(`http://localhost:8080/api/profiles/${userId}`)
  const data = await res.json()
  return data
}
