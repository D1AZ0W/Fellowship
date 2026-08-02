import { Outlet, createRootRoute } from '@tanstack/react-router'

import '../styles.css'
import { AuthProvider } from '#/contexts/AuthContext'
import { ThemeProvider } from '#/components/theme-provider'

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <ThemeProvider defaultTheme="light">
      <AuthProvider>
        <Outlet />
      </AuthProvider>
    </ThemeProvider>
  )
}
