import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'

import { useInviteGroup } from '#/hooks/groups/useInviteGroup'

import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

const schema = z.object({
  username: z.string().trim().min(1, 'Username is required'),
})

type FormData = z.infer<typeof schema>

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  groupId: number
}

export const InviteGroupDialog = ({ open, onOpenChange, groupId }: Props) => {
  const inviteMutation = useInviteGroup(groupId)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = (data: FormData) => {
    inviteMutation.mutate(data.username, {
      onSuccess: () => {
        reset()
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Invite Member</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label>Username</Label>

            <Input placeholder="Enter username" {...register('username')} />

            {errors.username && (
              <p className="mt-1 text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit" disabled={inviteMutation.isPending}>
              Invite
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
