import { useInfiniteQuery } from '@tanstack/react-query'
import { getGroups } from '#/services/groupService'

export const useGroups = () => {
  return useInfiniteQuery({
    queryKey: ['groups'],
    queryFn: ({ pageParam = 1 }) => getGroups(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => {
      if (!lastPage.next) return undefined
      const url = new URL(lastPage.next)
      return Number(url.searchParams.get('page'))
    },
  })
}
