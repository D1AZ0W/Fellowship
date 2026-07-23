import type { LoginRequest, RegisterRequest, AuthResponse } from '#/types/auth'
import { api } from '#/lib/axios'

export const login = async (
  credentials: LoginRequest,
): Promise<AuthResponse> => {
  const res = await api.post<AuthResponse>('api-auth/login/', credentials)
  return res.data
}

export const register = async (
  registerField: RegisterRequest,
): Promise<AuthResponse> => {
  const res = await api.post('api-auth/register/', registerField)
  return res.data
}
