import { getErrorMessage } from '../../utils/errorHandler'
import { editProfile } from '#/services/profileService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useEditPhoto = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (file: File) => {
      const formData = new FormData()
      formData.append('profile_picture', file)
      return editProfile(formData)
    },
    onSuccess: () => {
      toast.success('Profile photo updated.')
      queryClient.invalidateQueries({
        queryKey: ['profile'],
      })
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
