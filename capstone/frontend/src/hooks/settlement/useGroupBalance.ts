import { getGroupBalance } from '#/services/settlementService'
import { useQuery } from '@tanstack/react-query'

export const useGroupBalance = (id: number) => {
  return useQuery({
    queryKey: ['balance', id],
    queryFn: () => getGroupBalance(id),
    enabled: !!id,
  })
}
