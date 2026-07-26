import { inviteMember } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useInviteGroup = (groupId: number) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (username: string) => inviteMember(groupId, username),

    onSuccess: () => {
      toast.success('Member added successfully.')
      queryClient.invalidateQueries({
        queryKey: ['group', groupId],
      })
    },
  })
}
