import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateGroup } from '#/hooks/groups/useCreateGroup'
import { createGroupSchema } from '#/schemas/createGroupSchema'
import type { createGroupForm } from '#/schemas/createGroupSchema'

import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateGroupForm = ({ open, onOpenChange }: Props) => {
  const [image, setImage] = useState<File | null>(null)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<createGroupForm>({
    resolver: zodResolver(createGroupSchema),
  })

  const createGroupMutation = useCreateGroup()

  const onSubmit = (data: createGroupForm) => {
    const formData = new FormData()

    formData.append('name', data.name)
    if (data.type) {
      formData.append('type', data.type)
    }

    if (image) {
      formData.append('image', image)
    }

    createGroupMutation.mutate(formData, {
      onSuccess: () => {
        reset()
        setImage(null)
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Group</DialogTitle>
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
            <Label htmlFor="image">Group Image (Optional)</Label>

            <Input
              id="image"
              type="file"
              accept="image/*"
              onChange={(e) =>
                setImage(e.target.files ? e.target.files[0] : null)
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={createGroupMutation.isPending}
              className="w-full"
            >
              {createGroupMutation.isPending ? 'Creating...' : 'Create Group'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
