import { sendResetPasswordEmail } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'

export const useSendResetPasswordEmail = () => {
  return useMutation({
    mutationFn: sendResetPasswordEmail,
    onSuccess: (data) => {
      toast.success(data.msg)
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors?.non_field_errors?.[0] ??
          error.response?.data?.email?.[0] ??
          'Something went wrong'
        toast.error(message)
      } else {
        toast.error('An unexpected error occurred')
      }
    },
  })
}
