import { changePassword } from '#/services/profileService'
import { useMutation } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
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
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors.username[0] ?? 'Something went wrong'
        toast.error(message)
      }
    },
  })
}
