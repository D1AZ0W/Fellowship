import { createFileRoute } from '@tanstack/react-router'
import { UserActivity } from '#/pages/activity/UserActivity'

export const Route = createFileRoute('/_app/activity')({
  component: UserActivity,
})
