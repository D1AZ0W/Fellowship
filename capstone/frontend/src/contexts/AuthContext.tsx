import type { ReactNode } from 'react'
import { createContext, useCallback, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'
import { useNavigate } from '@tanstack/react-router'

import { logout as logoutService } from '#/services/authService'
import { useProfile } from '#/hooks/profile/useProfile'
import type { User } from '#/types/auth'

interface AuthContextType {
  user: User | null
  login: () => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  const { data: user } = useProfile()

  const refreshUser = useCallback(async () => {
    await queryClient.invalidateQueries({ queryKey: ['profile'] })
  }, [queryClient])

  const login = useCallback(async () => {
    await refreshUser()
  }, [refreshUser])

  const logout = useCallback(async () => {
    await logoutService()

    queryClient.clear()
    navigate({ to: '/' })
  }, [queryClient, navigate])

  const value = useMemo(
    () => ({
      user: user ?? null,
      login,
      logout,
      refreshUser,
    }),
    [user, login, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
