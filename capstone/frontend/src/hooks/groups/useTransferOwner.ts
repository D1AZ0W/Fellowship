import { transferOwner } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useTransferOwner = (groupId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (username: string) => transferOwner(groupId, username),
    onSuccess: (data) => {
      toast.success(data.msg)
      queryClient.invalidateQueries({
        queryKey: ['group', groupId],
      })
    },
  })
}
