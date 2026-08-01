import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useSendResetPasswordEmail } from '#/hooks/auth/useSendResetPasswordEmail'
import { sendResetPasswordEmailSchema } from '#/schemas/sendResetPasswordEmailSchema'
import type { SendResetPasswordEmailFormData } from '#/schemas/sendResetPasswordEmailSchema'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const ResetPasswordDialog = ({ open, onOpenChange }: Props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<SendResetPasswordEmailFormData>({
    resolver: zodResolver(sendResetPasswordEmailSchema),
    defaultValues: {
      email: '',
    },
  })

  const sendEmailMutation = useSendResetPasswordEmail()

  const onSubmit = (data: SendResetPasswordEmailFormData) => {
    sendEmailMutation.mutate(data, {
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
          <DialogTitle>Reset Password</DialogTitle>
          <DialogDescription>
            Enter your email address and we'll send you a link to reset your
            password.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="Enter your email"
              {...register('email')}
            />
            {errors.email && (
              <p className="text-sm text-red-500">{errors.email.message}</p>
            )}
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={sendEmailMutation.isPending}
          >
            {sendEmailMutation.isPending ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
