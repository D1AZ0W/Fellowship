import { resetPassword } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import axios from 'axios'

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
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors?.non_field_errors?.[0] ??
          'Something went wrong'
        toast.error(message)
      } else {
        toast.error('An unexpected error occurred')
      }
    },
  })
}
