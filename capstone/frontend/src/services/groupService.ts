import type { Group, PaginatedGroups, GroupDetails } from '#/types/group'
import { api } from '#/lib/axios'

export const getGroups = async (pageNumber = 1): Promise<PaginatedGroups> => {
  const res = await api.get('/groups/', { params: { page: pageNumber } })
  return res.data
}

export const getGroup = async (id: number): Promise<GroupDetails> => {
  const res = await api.get(`/groups/${id}/`)
  return res.data
}

export const createGroup = async (formData: FormData): Promise<Group> => {
  const res = await api.post('/groups/create/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
  return res.data.group
}
