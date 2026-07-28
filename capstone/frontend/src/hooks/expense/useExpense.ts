import { getExpense } from '#/services/expenseService'
import { useQuery } from '@tanstack/react-query'

export const useExpense = (id: number) => {
  return useQuery({
    queryKey: ['expense', id],
    queryFn: () => getExpense(id),
  })
}
