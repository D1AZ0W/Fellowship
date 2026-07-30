import type { ReactNode } from 'react'
import { createContext, useMemo } from 'react'
import { useQueryClient } from '@tanstack/react-query'

import { logout as logoutService } from '#/services/authService'
import { profile as profileGet } from '#/services/profileService'
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
  const queryClient = useQueryClient()

  const { data: user } = useProfile()

  const refreshUser = async () => {
    const profile = await profileGet()
    queryClient.setQueryData(['profile'], profile)
  }

  const login = async () => {
    await refreshUser()
  }

  const logout = async () => {
    await logoutService()

    queryClient.removeQueries({
      queryKey: ['profile'],
    })
  }

  const value = useMemo(
    () => ({
      user: user ?? null,
      login,
      logout,
      refreshUser,
    }),
    [user],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
