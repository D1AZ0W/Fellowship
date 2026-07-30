import { createFileRoute, redirect } from '@tanstack/react-router'
import { GuestLayout } from '#/components/layout/GuestLayout'
import { isAuthenticated } from '#/lib/auth'

export const Route = createFileRoute('/_guest')({
  beforeLoad: async () => {
    const authenticated = await isAuthenticated()
    if (authenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: GuestLayout,
})
