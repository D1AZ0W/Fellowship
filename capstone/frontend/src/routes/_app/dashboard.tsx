import { Dashboard } from '#/pages/home/Dashboard'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/dashboard')({
  component: Dashboard,
})
