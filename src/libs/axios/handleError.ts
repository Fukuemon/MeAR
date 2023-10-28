import { AxiosError } from 'axios'

export const handleApiError = (error: AxiosError, errorMessage: string) => {
  if (error.response) {
    console.error(errorMessage, error.response.data)
    console.error('Status code:', error.response.status)
    console.error('Headers:', error.response.headers)
  } else if (error.request) {
    console.error(errorMessage, error.request)
  } else {
    console.error('Error message:', error.message)
  }
}
