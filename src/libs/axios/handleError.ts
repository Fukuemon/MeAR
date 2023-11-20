import { AxiosError } from 'axios'
import { toast } from '@/components/ui/use-toast'

export const handleApiError = (error: AxiosError, errorMessage: string) => {
  if (error.response) {
    toast({
      title: errorMessage,
      variant: 'destructive'
      // action: <ToastAction altText="Try again">Try again</ToastAction>
    })
    console.error(errorMessage, error.response.data)
    console.error('Status code:', error.response.status)
    console.error('Headers:', error.response.headers)
  } else if (error.request) {
    toast({
      title: errorMessage,
      variant: 'destructive'
      // action: <ToastAction altText="Try again">Try again</ToastAction>
    })
    console.error(errorMessage, error.request)
  } else {
    toast({
      title: errorMessage,
      variant: 'destructive'
      // action: <ToastAction altText="Try again">Try again</ToastAction>
    })
    console.error('Error message:', error.message)
    toast({
      title: errorMessage,
      variant: 'destructive'
      // action: <ToastAction altText="Try again">Try again</ToastAction>
    })
  }
}
