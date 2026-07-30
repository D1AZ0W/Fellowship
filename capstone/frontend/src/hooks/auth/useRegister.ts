import { register } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
import axios from 'axios'
import { useAuth } from './useAuth'

export const useRegister = () => {
  const navigate = useNavigate()
  const auth = useAuth()
  return useMutation({
    mutationFn: register,
    onSuccess: (data) => {
      toast.success(data.msg)
      auth.login()
      navigate({ to: '/' })
    },
    onError: (error: Error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors.username[0] ?? 'Something went wrong'

        const message2 =
          error.response?.data?.errors.email[0] ?? 'Something went wrong'
        toast.error(message2)
        toast.error(message)
      }
    },
  })
}
