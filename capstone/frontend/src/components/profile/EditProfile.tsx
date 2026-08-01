import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEditProfile } from '#/hooks/profile/useEditProfile'
import type { User } from '#/types/auth'
import { editProfileSchema } from '#/schemas/editProfileSchema'
import type { EditProfileForm } from '#/schemas/editProfileSchema'

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

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  user: User
}

export const EditProfile = ({ open, onOpenChange, user }: Props) => {
  const editProfileMutation = useEditProfile()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<EditProfileForm>({
    resolver: zodResolver(editProfileSchema),
  })

  useEffect(() => {
    if (open) {
      reset({
        first_name: user.first_name,
        last_name: user.last_name,
        username: user.username,
        email: user.email,
      })
    }
  }, [user, open, reset])

  const onSubmit = (data: EditProfileForm) => {
    const formData = new FormData()
    formData.append('first_name', data.first_name)
    formData.append('last_name', data.last_name)
    formData.append('username', data.username)
    formData.append('email', data.email)

    editProfileMutation.mutate(formData, {
      onSuccess: () => {
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label>First Name</Label>
            <Input type="text" {...register('first_name')} />
            {errors.first_name && (
              <p className="text-sm text-destructive">
                {errors.first_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Last Name</Label>
            <Input type="text" {...register('last_name')} />
            {errors.last_name && (
              <p className="text-sm text-destructive">
                {errors.last_name.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Username</Label>
            <Input type="text" {...register('username')} />
            {errors.username && (
              <p className="text-sm text-destructive">
                {errors.username.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Email</Label>
            <Input type="email" {...register('email')} />
            {errors.email && (
              <p className="text-sm text-destructive">
                {errors.email.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={editProfileMutation.isPending}
              className="w-full bg-[#305c3c] hover:bg-[#264b30]"
            >
              {editProfileMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
