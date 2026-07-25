import { GroupIndv } from '#/pages/groups/GroupIndv'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/groups/$id')({
  component: GroupIndv,
})
