import { getErrorMessage } from '../../utils/errorHandler'
import { editGroup } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
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
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
