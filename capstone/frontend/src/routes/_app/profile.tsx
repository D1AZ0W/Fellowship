import { createFileRoute } from '@tanstack/react-router'
import { Profile } from '#/pages/profile/Profile'

export const Route = createFileRoute('/_app/profile')({
  component: Profile,
})
