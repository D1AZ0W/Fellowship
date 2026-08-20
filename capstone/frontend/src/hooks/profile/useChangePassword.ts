import { getErrorMessage } from '../../utils/errorHandler'
import { changePassword } from '#/services/profileService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const useChangePassword = () => {
  const navigate = useNavigate()
  return useMutation({
    mutationFn: changePassword,
    onSuccess: () => {
      toast.success('Successfully changed password!!!')
      navigate({ to: '/profile' })
    },
    onError: (error: Error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
