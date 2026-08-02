import { getGroupActivity } from '#/services/activityService'
import { useQuery } from '@tanstack/react-query'

export const useGroupActivity = (groupId?: number) => {
  return useQuery({
    queryKey: ['group-activity', groupId],
    queryFn: () => getGroupActivity(groupId!),
    enabled: !!groupId,
  })
}
