import { login } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { useAuth } from './useAuth'
import { toast } from 'sonner'
import axios from 'axios'

export const useLogin = () => {
  const auth = useAuth()
  const navigate = useNavigate()
  return useMutation({
    mutationFn: login,
    onSuccess: (data) => {
      toast.success('Successful Login!!!')
      auth.login(data.token)
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
