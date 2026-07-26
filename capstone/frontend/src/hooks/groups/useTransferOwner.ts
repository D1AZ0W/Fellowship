import { transferOwner } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors[0] ?? 'Something went wrong'
        toast.error(message)
      }
    },
  })
}
