import { useMutation, useQueryClient } from '@tanstack/react-query'
import { toast } from 'sonner'
import axios from 'axios'
import { createSettlement } from '#/services/settlementService'

export const useCreateSettlement = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationFn: (data: FormData) => createSettlement(data),
    onSuccess: () => {
      toast.success('Setlled up successfully.')

      queryClient.invalidateQueries({
        queryKey: ['settlements'],
      })
    },
    onError: (error) => {
      if (axios.isAxiosError(error)) {
        const message =
          error.response?.data?.errors[0] ?? 'Something went wrong'
        toast.error(message)
      }
    },
  })
}
