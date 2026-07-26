import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createGroup } from '#/services/groupService'
import axios from 'axios'

export const useCreateGroup = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => createGroup(data),
    onSuccess: () => {
      toast.success('Group created successfully.')

      queryClient.invalidateQueries({
        queryKey: ['groups'],
      })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors[0] ?? 'Something went wrong'
        toast.error(message)
      }
    },
  })
}
