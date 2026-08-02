import type { Activity } from '#/types/activity'
import { api } from '#/lib/axios'

export const getGroupActivity = async (id: number): Promise<Activity[]> => {
  const res = await api.get<Activity[]>(`activity/${id}/`)
  return res.data
}

export const getUserActivity = async (): Promise<Activity[]> => {
  const res = await api.get<Activity[]>(`activity/`)
  return res.data
}
