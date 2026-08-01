import { editProfile } from '#/services/profileService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors?.[0] ?? 'Failed to update photo.'
        toast.error(message)
      }
    },
  })
}
