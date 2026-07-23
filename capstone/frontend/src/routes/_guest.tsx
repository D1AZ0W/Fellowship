import { createFileRoute, Outlet, redirect } from '@tanstack/react-router'
import { GuestLayout } from '#/components/layout/GuestLayout'

export const Route = createFileRoute('/_guest')({
  beforeLoad: () => {
    const token = localStorage.getItem('access_token')

    if (token) {
      throw redirect({
        to: '/dashboard',
      })
    }
  },
  component: GuestLayout,
})
