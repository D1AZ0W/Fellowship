import { deleteExpense } from '#/services/expenseService'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'
import axios from 'axios'
import { toast } from 'sonner'

export const useDeleteExpense = () => {
  const queryClient = useQueryClient()
  const navigate = useNavigate()

  return useMutation({
    mutationFn: deleteExpense,

    onSuccess: () => {
      toast.success('Expense deleted successfully.')

      queryClient.invalidateQueries({
        queryKey: ['user-expenses', 'group-expenses'],
      })

      navigate({
        to: '..',
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
