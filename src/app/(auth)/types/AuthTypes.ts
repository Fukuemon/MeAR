export type LoginResponseType = {
  access: string
  refresh: string
  profile: {
    id: number
    username: string
    account: number
    created_on: string
    updated_on: string
    img?: string | null
    followings: Array<{
      username: string
      created_on: string
      img?: string | null
    }>
    followers: Array<{
      username: string
      created_on?: string
      img?: string | null
    }>
  }
  message: string
}
