import { profile } from '#/services/profileService'
import { useQuery } from '@tanstack/react-query'

export const useProfile = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['profile'],
    queryFn: profile,
  })
  return { data, isPending, isError, error }
}
