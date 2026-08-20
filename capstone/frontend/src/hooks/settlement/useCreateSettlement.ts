import { getErrorMessage } from '../../utils/errorHandler'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import { createSettlement } from '#/services/settlementService'

export const useCreateSettlement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => createSettlement(data),
    onSuccess: () => {
      toast.success('Setlled up successfully.')

      queryClient.invalidateQueries({
        queryKey: ['settlements'],
      })
      queryClient.invalidateQueries({
        queryKey: ['balance'],
      })
      queryClient.invalidateQueries({
        queryKey: ['suggested'],
      })
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
