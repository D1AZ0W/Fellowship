import { getBalance } from '#/services/settlementService'
import { useQuery } from '@tanstack/react-query'

export const useBalance = (id: number) => {
  return useQuery({
    queryKey: ['settlements', id],
    queryFn: () => getBalance(id),
    enabled: !!id,
  })
}
