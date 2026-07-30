import { queryClient } from './queryClient'
import { profile } from '#/services/profileService'

export const isAuthenticated = async () => {
  try {
    await queryClient.fetchQuery({
      queryKey: ['profile'],
      queryFn: profile,
      staleTime: 15 * 1000 * 60,
    })
    return true
  } catch {
    return false
  }
}
