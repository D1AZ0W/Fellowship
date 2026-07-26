import { useState } from 'react'
import { MoreVertical, Settings, Trash } from 'lucide-react'

import type { GroupDetails } from '#/types/group'
import { iconType } from '#/utils/iconType'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

import { InviteGroupDialog } from './InviteGroupDialog'
import { EditGroupDialog } from './EditGroupDialog'
import { DeleteGroupDialog } from './DeleteGroupDialog'

type Props = {
  group: GroupDetails
}

export const GroupHeader = ({ group }: Props) => {
  const [inviteOpen, setInviteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)

  return (
    <>
      <Card>
        <CardContent className="flex flex-col justify-between gap-6 p-6 md:flex-row md:items-center">
          <div className="flex items-center gap-5">
            <Avatar className="h-20 w-20 rounded-2xl">
              <AvatarImage src={group.image ?? undefined} />

              <AvatarFallback className="bg-primary text-primary-foreground">
                {iconType(group.type)}
              </AvatarFallback>
            </Avatar>

            <div className="space-y-3">
              <h1 className="text-3xl font-bold">{group.name}</h1>

              <div className="flex items-center gap-3">
                <Badge variant="secondary" className="px-3 py-1 text-sm">
                  {group.type}
                </Badge>

                <Badge variant={group.role === 'Owner' ? 'default' : 'outline'}>
                  {group.role}
                </Badge>
              </div>
            </div>
          </div>

          {group.role === 'Owner' && (
            <div className="flex items-center gap-2">
              <Button onClick={() => setInviteOpen(true)}>Add Member</Button>

              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="h-5 w-5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="min-w-44">
                  <DropdownMenuItem onClick={() => setEditOpen(true)}>
                    <Settings className="mr-2 h-4 w-4" />
                    Edit Group
                  </DropdownMenuItem>

                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setDeleteOpen(true)}
                  >
                    <Trash className="mr-2 h-4 w-4" />
                    Delete Group
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          )}
        </CardContent>
      </Card>

      <InviteGroupDialog
        open={inviteOpen}
        onOpenChange={setInviteOpen}
        groupId={group.id}
      />

      <EditGroupDialog
        open={editOpen}
        onOpenChange={setEditOpen}
        group={group}
      />

      <DeleteGroupDialog
        open={deleteOpen}
        onOpenChange={setDeleteOpen}
        groupId={group.id}
      />
    </>
  )
}
