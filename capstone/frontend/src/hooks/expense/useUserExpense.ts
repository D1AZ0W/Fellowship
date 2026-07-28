import { getUserExpenses } from '#/services/expenseService'
import { useInfiniteQuery } from '@tanstack/react-query'

export const useUserExpense = () => {
  return useInfiniteQuery({
    queryKey: ['user-expenses'],
    queryFn: ({ pageParam = 1 }) => getUserExpenses(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const url = new URL(lastPage.next)
      return Number(url.searchParams.get('page'))
    },
  })
}
