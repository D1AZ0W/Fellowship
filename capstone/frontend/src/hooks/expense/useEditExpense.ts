import { getErrorMessage } from '../../utils/errorHandler'
import { editExpense } from '#/services/expenseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'

export const useEditExpense = (id: number) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => editExpense(id, data),
    onSuccess: () => {
      toast.success('Expense edited successfully.')

      queryClient.invalidateQueries({
        queryKey: ['expense', id],
      })
    },

    onError: (error) => {
      const message = getErrorMessage(error);
      toast.error(message);
    },
  })
}
