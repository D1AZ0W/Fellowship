import { useState } from 'react'
import { GroupExpenses } from '#/components/groups/GroupExpenses'
import { GroupActivity } from '#/components/groups/GroupActivity'
import { GroupHeader } from '#/components/groups/GroupHeader'
import { GroupMembers } from '#/components/groups/GroupMembers'
import { GroupSettlements } from '#/components/groups/GroupSettlements'
import { CreateSettlementDialog } from '#/components/groups/CreateSettlementDialog'
import { AlertMessage } from '#/components/shared/AlertMessage'
import { useGroup } from '#/hooks/groups/useGroup'
import { useAuth } from '#/hooks/auth/useAuth'
import { useParams } from '@tanstack/react-router'
import { GroupBalanceSummary } from '#/components/groups/GroupBalanceSummary'
import { Button } from '@/components/ui/button'


export const GroupIndv = () => {
  const { id } = useParams({ from: '/_app/groups/$id' })
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState<'Activity' | 'Expenses' | 'Settlements'>('Activity')
  const [settleUpOpen, setSettleUpOpen] = useState(false)

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

      <GroupBalanceSummary
        groupId={group.id}
        onSettleUpClick={() => setSettleUpOpen(true)}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 flex flex-col gap-6">
          <div className="flex gap-2 border-b border-border pb-2">
            {(['Activity', 'Expenses', 'Settlements'] as const).map((tab) => (
              <Button
                key={tab}
                variant={activeTab === tab ? 'default' : 'ghost'}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </Button>
            ))}
          </div>

          {activeTab === 'Activity' && (
            <GroupActivity groupId={group.id} />
          )}

          {activeTab === 'Expenses' && (
            <GroupExpenses groupId={group.id} members={group.members} />
          )}

          {activeTab === 'Settlements' && (
            <GroupSettlements groupId={group.id} />
          )}
        </div>

        <GroupMembers
          members={group.members}
          currentRole={group.role}
          groupId={group.id}
        />
      </div>

      {user && (
        <CreateSettlementDialog
          groupId={group.id}
          members={group.members}
          currentUserId={user.id}
          open={settleUpOpen}
          onOpenChange={setSettleUpOpen}
        />
      )}
    </div>
  )
}
