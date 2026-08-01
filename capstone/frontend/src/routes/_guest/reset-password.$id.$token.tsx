import { ResetPassword } from '#/pages/auth/ResetPassword'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_guest/reset-password/$id/$token')({
  component: ResetPassword,
})
