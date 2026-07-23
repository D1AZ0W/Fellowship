import type { ReactNode } from 'react'
import { createContext, useMemo, useState } from 'react'

import type { User, Token } from '#/types/auth'

interface AuthContextType {
  user: User | null
  token: Token | null
  isAuthenticated: boolean
  login: (token: Token) => void
  logout: () => void
  setUser: (user: User | null) => void
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined)

type Props = {
  children: ReactNode
}

export const AuthProvider = ({ children }: Props) => {
  const [user, setUser] = useState<User | null>(null)
  const [token, setToken] = useState<Token | null>(null)

  const login = (tokenR: Token) => {
    setToken(tokenR)
    localStorage.setItem('access_token', tokenR.access)
    localStorage.setItem('refresh_token', tokenR.refresh)
  }

  const logout = () => {
    setUser(null)
    setToken(null)
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
  }

  const value = useMemo(
    () => ({
      user,
      token,
      isAuthenticated: !!token,
      login,
      logout,
      setUser,
    }),
    [token],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
