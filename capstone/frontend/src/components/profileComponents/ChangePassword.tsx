import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { changePasswordSchema } from '#/schemas/changePasswordSchema'
import type { ChangePasswordForm } from '#/schemas/changePasswordSchema'
import { useChangePassword } from '#/hooks/profileHook/useChangePassword'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ChangePassword = ({ open, onOpenChange }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ChangePasswordForm>({
    resolver: zodResolver(changePasswordSchema),
  })

  const changePasswordMutation = useChangePassword()

  const onSubmit = (data: ChangePasswordForm) => {
    changePasswordMutation.mutate(data)
    reset()
    onOpenChange(false)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change Password</DialogTitle>

          <DialogDescription>Enter your new password below.</DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="password">New Password</Label>

            <Input id="password" type="password" {...register('password')} />

            {errors.password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.password.message}
              </p>
            )}
          </div>

          <div>
            <Label htmlFor="confirm_password">Confirm Password</Label>

            <Input
              id="confirm_password"
              type="password"
              {...register('confirm_password')}
            />

            {errors.confirm_password && (
              <p className="mt-1 text-sm text-red-500">
                {errors.confirm_password.message}
              </p>
            )}
          </div>

          <DialogFooter>
            <Button type="submit">Change Password</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
