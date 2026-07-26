import { deleteGroup } from '#/services/groupService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { toast } from 'sonner'

export const useDeleteGroup = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: deleteGroup,

    onSuccess: () => {
      toast.success('Group deleted successfully.')

      queryClient.invalidateQueries({
        queryKey: ['groups'],
      })

      navigate({
        to: '/groups',
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
