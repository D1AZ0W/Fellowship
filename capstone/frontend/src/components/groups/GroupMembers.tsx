import { useState } from 'react'

import type { Members } from '#/types/group'

import { useKickMember } from '#/hooks/groups/useKickMember'
import { useTransferOwner } from '#/hooks/groups/useTransferOwner'

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
import { Separator } from '@/components/ui/separator'
import { Button } from '@/components/ui/button'

import { Crown, MoreVertical, Trash2 } from 'lucide-react'

type Props = {
  members: Members[]
  groupId: number
  currentRole: 'Owner' | 'Member'
}

export const GroupMembers = ({ members, groupId, currentRole }: Props) => {
  const transferOwner = useTransferOwner(groupId)
  const kickMember = useKickMember(groupId)

  const [selectedMember, setSelectedMember] = useState<Members | null>(null)
  const [transferOpen, setTransferOpen] = useState(false)
  const [kickOpen, setKickOpen] = useState(false)

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Members</CardTitle>
        </CardHeader>

        <Separator />

        <CardContent className="max-h-96 space-y-4 overflow-y-auto p-4">
          {members.map((member) => (
            <div
              key={member.id}
              className="flex items-center justify-between rounded-lg border border-border p-3 transition-colors hover:bg-accent"
            >
              <div className="flex items-center gap-3">
                <Avatar>
                  <AvatarImage src={member.profile_picture ?? undefined} />

                  <AvatarFallback className="bg-primary text-primary-foreground">
                    {member.first_name[0]}
                  </AvatarFallback>
                </Avatar>

                <div>
                  <p className="font-medium">
                    {member.first_name} {member.last_name}
                  </p>

                  <p className="text-sm text-muted-foreground">
                    @{member.username}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <Badge
                  variant={member.role === 'Owner' ? 'default' : 'secondary'}
                >
                  {member.role}
                </Badge>

                {currentRole === 'Owner' && member.role !== 'Owner' && (
                  <DropdownMenu>
                    <DropdownMenuTrigger>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>

                    <DropdownMenuContent align="end" className="min-w-44">
                      <DropdownMenuItem
                        onClick={() => {
                          setSelectedMember(member)
                          setTransferOpen(true)
                        }}
                        className="text-amber-500"
                      >
                        <Crown className="mr-2 h-4 w-4 " />
                        Transfer Ownership
                      </DropdownMenuItem>

                      <DropdownMenuItem
                        className="text-destructive"
                        onClick={() => {
                          setSelectedMember(member)
                          setKickOpen(true)
                        }}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Kick Member
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                )}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      <AlertDialog open={transferOpen} onOpenChange={setTransferOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Transfer ownership?</AlertDialogTitle>
            <AlertDialogDescription>
              {selectedMember &&
                `Make ${selectedMember.first_name} ${selectedMember.last_name} the owner of this group?`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!selectedMember) return

                transferOwner.mutate(selectedMember.username)
                setTransferOpen(false)
              }}
            >
              Transfer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog open={kickOpen} onOpenChange={setKickOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove member?</AlertDialogTitle>

            <AlertDialogDescription>
              {selectedMember &&
                `Remove ${selectedMember.first_name} ${selectedMember.last_name} from this group?`}
            </AlertDialogDescription>
          </AlertDialogHeader>

          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (!selectedMember) return

                kickMember.mutate(selectedMember.username)
                setKickOpen(false)
              }}
            >
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
