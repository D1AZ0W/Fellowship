import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createGroup } from '#/services/groupService'

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
  })
}
