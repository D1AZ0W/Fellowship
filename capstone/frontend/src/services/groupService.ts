import type { Group, PaginatedGroups, GroupDetails } from '#/types/group'
import { api } from '#/lib/axios'
import type { MessageResponse } from '#/types/auth'

export const getGroups = async (pageNumber = 1): Promise<PaginatedGroups> => {
  const res = await api.get('/groups/', { params: { page: pageNumber } })
  return res.data
}

export const getGroup = async (id: number): Promise<GroupDetails> => {
  const res = await api.get(`/groups/${id}/`)
  return res.data
}

export const createGroup = async (data: FormData): Promise<Group> => {
  const res = await api.post('/groups/create/', data)
  return res.data.group
}

export const editGroup = async (
  id: number,
  formData: FormData,
): Promise<GroupDetails> => {
  const res = await api.patch(`/groups/${id}/edit/`, formData)

  return res.data
}

export const inviteMember = async (
  id: number,
  username: string,
): Promise<MessageResponse> => {
  const res = await api.post(`/groups/${id}/invite/`, { username })
  return res.data
}

export const deleteGroup = async (id: number) => {
  await api.delete(`/groups/${id}/delete/`)
}

export const transferOwner = async (
  id: number,
  username: string,
): Promise<MessageResponse> => {
  const res = await api.post(`/groups/${id}/owner_transfer/`, { username })
  return res.data
}

export const kickMember = async (
  id: number,
  username: string,
): Promise<MessageResponse> => {
  const res = await api.post(`/groups/${id}/kick/`, { username })
  return res.data
}

export const leaveGroup = async (id: number): Promise<MessageResponse> => {
  const res = await api.post(`/groups/${id}/leave/`)
  return res.data
}
