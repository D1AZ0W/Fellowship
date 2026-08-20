import { getErrorMessage } from '../../utils/errorHandler'
import { createExpense } from '#/services/expenseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useCreateExpense = (groupId: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => createExpense(data),
    onSuccess: () => {
      toast.success('Expense created successfully.')
      queryClient.invalidateQueries({
        queryKey: ['group-expenses', groupId],
      })
      queryClient.invalidateQueries({
        queryKey: ['group', groupId],
      })
      queryClient.invalidateQueries({
        queryKey: ['suggested', groupId],
      })
      queryClient.invalidateQueries({
        queryKey: ['balance', groupId],
      })
      queryClient.invalidateQueries({
        queryKey: ['group-activity', groupId],
      })
    },
    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
