import { getGroupExpenses } from '#/services/expenseService'
import { useQuery } from '@tanstack/react-query'

export const useGroupExpense = (groupId?: number) => {
  return useQuery({
    queryKey: ['group-expenses', groupId],
    queryFn: () => getGroupExpenses(groupId),
    enabled: !!groupId,
  })
}
