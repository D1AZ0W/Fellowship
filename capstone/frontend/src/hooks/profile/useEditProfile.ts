import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors?.[0] ?? 'Failed to update profile.'
        toast.error(message)
      } else {
        toast.error('An unexpected error occurred.')
      }
    },
  })
}
