import { toast } from 'react-hot-toast'

export const notify = {
  success: (message: string) => toast.success(message, {
    duration: 3000,
    position: 'top-right',
  }),
  error: (message: string) => toast.error(message, {
    duration: 4000,
    position: 'top-right',
  }),
  loading: (message: string) => toast.loading(message, {
    position: 'top-right',
  }),
  promise: async <T>(
    promise: Promise<T>,
    messages: {
      loading: string
      success: string
      error: string
    }
  ) => {
    return toast.promise(promise, {
      loading: messages.loading,
      success: messages.success,
      error: messages.error,
    })
  }
} 