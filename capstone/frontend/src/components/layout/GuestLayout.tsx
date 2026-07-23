import { Outlet } from '@tanstack/react-router'
import { LoggedOutNav } from './LoggedOutNav'

export const GuestLayout = () => {
  return (
    <div className="flex min-h-screen flex-col">
      <LoggedOutNav />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  )
}
