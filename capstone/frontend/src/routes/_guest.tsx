import { createFileRoute, Outlet } from '@tanstack/react-router'
import { GuestLayout } from '#/components/layout/GuestLayout'

export const Route = createFileRoute('/_guest')({
  component: GuestLayout,
})

export function Guest() {
  return <Outlet />
}
