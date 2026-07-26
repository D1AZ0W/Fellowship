import { useState } from 'react'
import { LogOut, MoreVertical, Settings, Trash } from 'lucide-react'

import type { GroupDetails } from '#/types/group'
import { iconType } from '#/utils/iconType'
import { useLeaveGroup } from '#/hooks/groups/useLeaveGroup'

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
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'

import { InviteGroupDialog } from './InviteGroupDialog'
import { EditGroupDialog } from './EditGroupDialog'
import { DeleteGroupDialog } from './DeleteGroupDialog'

type Props = {
  group: GroupDetails
}

export const GroupHeader = ({ group }: Props) => {
  const leaveGroup = useLeaveGroup(group.id)

  const [inviteOpen, setInviteOpen] = useState(false)
  const [editOpen, setEditOpen] = useState(false)
  const [deleteOpen, setDeleteOpen] = useState(false)
  const [leaveOpen, setLeaveOpen] = useState(false)

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

          {group.role === 'Owner' ? (
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
          ) : (
            <div className="flex items-center gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger>
                  <MoreVertical className="h-5 w-5" />
                </DropdownMenuTrigger>

                <DropdownMenuContent align="end" className="min-w-44">
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive"
                    onClick={() => setLeaveOpen(true)}
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Leave Group
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

      <AlertDialog open={leaveOpen} onOpenChange={setLeaveOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Leave group?</AlertDialogTitle>

            <AlertDialogDescription>
              {`Are you sure you want to leave ${group.name}? You'll need to be re-invited to rejoin.`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>

            <AlertDialogAction
              onClick={() => {
                leaveGroup.mutate()
                setLeaveOpen(false)
              }}
            >
              Leave
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
