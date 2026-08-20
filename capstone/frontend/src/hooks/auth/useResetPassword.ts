import { getErrorMessage } from '../../utils/errorHandler'
import { resetPassword } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
export const useResetPassword = () => {
  const navigate = useNavigate()

  return useMutation({
    mutationFn: ({
      id,
      token,
      data,
    }: {
      id: string
      token: string
      data: { password: string; confirm_password: string }
    }) => resetPassword(id, token, data),
    onSuccess: (data) => {
      toast.success(data.msg)
      navigate({ to: '/login' })
    },
    onError: (error: Error) => {
      const message = getErrorMessage(error);
      toast.error(message); else {
        toast.error('An unexpected error occurred')
      }
    },
  })
}
