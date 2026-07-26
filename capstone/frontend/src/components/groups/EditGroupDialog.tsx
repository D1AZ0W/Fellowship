import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import type { GroupDetails } from '#/types/group'
import { useEditGroup } from '#/hooks/groups/useEditGroup'
import type { createGroupForm } from '#/schemas/createGroupSchema'
import { createGroupSchema } from '#/schemas/createGroupSchema'

import { Button } from '../ui/button'
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  group: GroupDetails
}

export const EditGroupDialog = ({ open, onOpenChange, group }: Props) => {
  const [image, setImage] = useState<File | null>(null)

  const editGroupMutation = useEditGroup(group.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createGroupForm>({
    resolver: zodResolver(createGroupSchema),
  })

  useEffect(() => {
    if (open) {
      reset({
        name: group.name,
        type: group.type,
      })

      setImage(null)
    }
  }, [group, open, reset])

  const onSubmit = (data: createGroupForm) => {
    const formData = new FormData()

    formData.append('name', data.name)

    if (data.type) {
      formData.append('type', data.type)
    }

    if (image) {
      formData.append('image', image)
    }

    editGroupMutation.mutate(formData, {
      onSuccess: () => {
        setImage(null)
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit Group</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="name">Group Name</Label>

            <Input id="name" {...register('name')} />

            {errors.name && (
              <p className="text-sm text-destructive">{errors.name.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="type">Group Type</Label>

            <select
              id="type"
              {...register('type')}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              <option value="">Select a type</option>
              <option value="Trip">Trip</option>
              <option value="Home">Home</option>
              <option value="Couple">Couple</option>
              <option value="Other">Other</option>
            </select>

            {errors.type && (
              <p className="text-sm text-destructive">{errors.type.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Current Image</Label>

            {group.image ? (
              <img
                src={group.image}
                alt={group.name}
                className="h-24 w-24 rounded-lg border object-cover"
              />
            ) : (
              <p className="text-sm text-muted-foreground">No image uploaded</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="image">Replace Image (Optional)</Label>

            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              className="w-full"
              disabled={editGroupMutation.isPending}
            >
              {editGroupMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
