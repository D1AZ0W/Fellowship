import { getErrorMessage } from '../../utils/errorHandler'
import { inviteMember } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useInviteGroup = (groupId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (username: string) => inviteMember(groupId, username),

    onSuccess: (data) => {
      toast.success(data.msg)
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
