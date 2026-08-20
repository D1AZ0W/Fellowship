import { getErrorMessage } from '../../utils/errorHandler'
import { sendResetPasswordEmail } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { toast } from 'sonner'
export const useSendResetPasswordEmail = () => {
  return useMutation({
    mutationFn: sendResetPasswordEmail,
    onSuccess: (data) => {
      toast.success(data.msg)
    },
    onError: (error: Error) => {
      const message = getErrorMessage(error);
      toast.error(message); else {
        toast.error('An unexpected error occurred')
      }
    },
  })
}
