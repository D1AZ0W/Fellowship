import { editExpense } from '#/services/expenseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors.detail ?? 'Something went wrong'
        toast.error(message)
      }
    },
  })
}
