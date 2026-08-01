import { api } from '#/lib/axios'
import type { DashboardData } from '#/types/dashboard'

export const getDashboardData = async (): Promise<DashboardData> => {
  const res = await api.get('/dashboard/')
  return res.data
}
