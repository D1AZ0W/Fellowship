import { Outlet, createFileRoute, redirect } from '@tanstack/react-router'
import { AppLayout } from '#/components/layout/AppLayout'
import { isAuthenticated } from '#/lib/auth'

export const Route = createFileRoute('/_app')({
  beforeLoad: async () => {
    const authenticated = await isAuthenticated()
    if (!authenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppRoute,
})

function AppRoute() {
  return (
    <AppLayout>
      <Outlet />
    </AppLayout>
  )
}
