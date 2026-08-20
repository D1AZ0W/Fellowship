import { getErrorMessage } from '../../utils/errorHandler'
import { login } from '#/services/authService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'
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
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
