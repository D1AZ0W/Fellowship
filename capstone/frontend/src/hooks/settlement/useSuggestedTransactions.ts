import { listSuggested } from '#/services/settlementService'
import { useQuery } from '@tanstack/react-query'

export const useSuggestedTransactions = (group_id: number) => {
  return useQuery({
    queryKey: ['suggested', group_id],
    queryFn: () => listSuggested(group_id),
    enabled: !!group_id,
  })
}
