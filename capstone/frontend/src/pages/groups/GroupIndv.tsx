import { GroupExpenses } from '#/components/groups/GroupExpenses'
import { GroupHeader } from '#/components/groups/GroupHeader'
import { GroupMembers } from '#/components/groups/GroupMembers'
import { useGroup } from '#/hooks/groups/useGroup'
import { useParams } from '@tanstack/react-router'

export const GroupIndv = () => {
  const { id } = useParams({
    from: '/_app/groups/$id',
  })

  const { data: group, isPending } = useGroup(Number(id))

  if (isPending || !group) {
    return (
      <div className="flex h-64 items-center justify-center">Loading...</div>
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <GroupHeader group={group} />

      <div className="grid gap-6 lg:grid-cols-3">
        <GroupExpenses />

        <GroupMembers
          members={group.members}
          currentRole={group.role}
          groupId={group.id}
        />
      </div>
    </div>
  )
}
