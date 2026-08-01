import { createExpense } from '#/services/expenseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
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
