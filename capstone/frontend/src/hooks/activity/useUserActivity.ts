import { getUserActivity } from '#/services/activityService'
import { useQuery } from '@tanstack/react-query'

export const useUserActivity = () => {
  return useQuery({
    queryKey: ['user-activity'],
    queryFn: getUserActivity,
  })
}
