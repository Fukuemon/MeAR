import axios from 'axios'

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL
})

export const fetcher = (url: string) => api.get(url).then((res) => res.data)
