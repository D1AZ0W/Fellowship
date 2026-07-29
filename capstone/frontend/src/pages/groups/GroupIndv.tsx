import { GroupExpenses } from '#/components/groups/GroupExpenses'
import { GroupHeader } from '#/components/groups/GroupHeader'
import { GroupMembers } from '#/components/groups/GroupMembers'
import { AlertMessage } from '#/components/shared/AlertMessage'
import { useGroup } from '#/hooks/groups/useGroup'
import { useParams } from '@tanstack/react-router'

export const GroupIndv = () => {
  const { id } = useParams({ from: '/_app/groups/$id' })

  const { data: group, isPending, isError, error } = useGroup(Number(id))

  if (isPending) {
    return (
      <div className="flex h-64 items-center justify-center">Loading...</div>
    )
  }
  if (isError) {
    return (
      <AlertMessage
        variant="destructive"
        title="Error occured"
        message={error}
      />
    )
  }

  return (
    <div className="flex flex-col gap-6">
      <GroupHeader group={group} />

      <div className="grid gap-6 lg:grid-cols-3">
        <GroupExpenses groupId={group.id} members={group.members} />

        <GroupMembers
          members={group.members}
          currentRole={group.role}
          groupId={group.id}
        />
      </div>
    </div>
  )
}
