import { GroupList } from '#/pages/groups/GroupList'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_app/groups/')({
  component: GroupList,
})
