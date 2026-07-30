import type {
  LoginRequest,
  MessageResponse,
  RegisterRequest,
} from '#/types/auth'
import { api } from '#/lib/axios'

export const login = async (
  credentials: LoginRequest,
): Promise<MessageResponse> => {
  const res = await api.post<MessageResponse>('api-auth/login/', credentials)
  return res.data
}

export const register = async (
  registerField: RegisterRequest,
): Promise<MessageResponse> => {
  const res = await api.post('api-auth/register/', registerField)
  return res.data
}
export const logout = async (): Promise<MessageResponse> => {
  const res = await api.post('api-auth/logout/')
  return res.data
}
