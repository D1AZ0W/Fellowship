import { useQuery } from '@tanstack/react-query'
import { getGroup } from '#/services/groupService'

export const useGroup = (id: number) => {
  return useQuery({
    queryKey: ['group', id],
    queryFn: () => getGroup(id),
    enabled: !!id,
  })
}
