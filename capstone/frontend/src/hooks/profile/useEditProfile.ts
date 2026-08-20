import { getErrorMessage } from '../../utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { editProfile } from '#/services/profileService'

export const useEditProfile = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (formData: FormData) => editProfile(formData),
    onSuccess: () => {
      toast.success('Profile updated successfully.')
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message); else {
        toast.error('An unexpected error occurred.')
      }
    },
  })
}
