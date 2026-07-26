import { editGroup } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { toast } from 'sonner'

export const useEditGroup = (groupId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => editGroup(groupId, data),
    onSuccess: () => {
      toast.success('Group edited successfully.')

      queryClient.invalidateQueries({
        queryKey: ['group', groupId],
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
