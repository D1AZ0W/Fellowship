import type { ChangePasswordRequest, MessageResponse, User } from '#/types/auth'
import { api } from '#/lib/axios'

export const profile = async (): Promise<User> => {
  const res = await api.get<User>('api-auth/profile/')
  return res.data
}

export const changePassword = async (
  passwordField: ChangePasswordRequest,
): Promise<MessageResponse> => {
  const res = await api.post('api-auth/changepassword/', passwordField)
  return res.data
}
