import { getErrorMessage } from '../../utils/errorHandler'
import { leaveGroup } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import { toast } from 'sonner'

export const useLeaveGroup = (groupId: number) => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: () => leaveGroup(groupId),

    onSuccess: (data) => {
      toast.success(data.msg)

      queryClient.invalidateQueries({
        queryKey: ['groups'],
      })
      queryClient.removeQueries({
        queryKey: ['group', groupId],
      })

      navigate({
        to: '/groups',
      })
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
