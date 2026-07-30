import { login } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import axios from 'axios'
import { useAuth } from './useAuth'

export const useLogin = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  return useMutation({
    mutationFn: login,
    onSuccess: async (data) => {
      toast.success(data.msg)
      await auth.login()
      navigate({ to: '/' })
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors.non_field_errors[0] ??
          'Something went wrong'
        toast.error(message)
      }
    },
  })
}
