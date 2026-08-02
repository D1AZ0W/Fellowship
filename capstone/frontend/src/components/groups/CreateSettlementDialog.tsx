import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateSettlement } from '#/hooks/settlement/useCreateSettlement'
import type { CreateSettlementForm } from '#/schemas/createSettlementSchema'
import { createSettlementSchema } from '#/schemas/createSettlementSchema'
import type { Members } from '#/types/group'

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
import { Textarea } from '@/components/ui/textarea'

type Props = {
  groupId: number
  members: Members[]
  currentUserId: number
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const CreateSettlementDialog = ({
  groupId,
  members,
  currentUserId,
  open,
  onOpenChange,
}: Props) => {
  const [images, setImages] = useState<File[]>([])

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<CreateSettlementForm>({
    resolver: zodResolver(createSettlementSchema),
  })

  const createSettlementMutation = useCreateSettlement()

  const onSubmit = (data: CreateSettlementForm) => {
    const formData = new FormData()

    formData.append('group', groupId.toString())
    formData.append('payer', currentUserId.toString())
    formData.append('recipient', data.recipient.toString())
    formData.append('amount', data.amount.toString())
    if (data.note) {
      formData.append('note', data.note)
    }

    images.forEach((img) => {
      formData.append('images', img)
    })

    createSettlementMutation.mutate(formData, {
      onSuccess: () => {
        reset()
        setImages([])
        onOpenChange(false)
      },
    })
  }

  const recipients = members.filter((m) => m.id !== currentUserId)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Settle Up</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
          <div className="space-y-2">
            <Label htmlFor="recipient">Recipient</Label>

            <select
              id="recipient"
              {...register('recipient', { valueAsNumber: true })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
              <option value="">Select recipient</option>
              {recipients.map((m) => (
                <option key={m.id} value={m.id}>
                  {m.first_name} {m.last_name} (@{m.username})
                </option>
              ))}
            </select>

            {errors.recipient && (
              <p className="text-sm text-destructive">
                {errors.recipient.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="amount">Amount (Rs.)</Label>

            <Input
              id="amount"
              type="number"
              step="0.01"
              {...register('amount', { valueAsNumber: true })}
            />

            {errors.amount && (
              <p className="text-sm text-destructive">
                {errors.amount.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="note">Note (Optional)</Label>

            <Textarea id="note" {...register('note')} />

            {errors.note && (
              <p className="text-sm text-destructive">{errors.note.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="images">Receipt Images (Optional)</Label>

            <Input
              id="images"
              type="file"
              accept="image/*"
              multiple
              onChange={(e) =>
                setImages(Array.from(e.target.files ? e.target.files : []))
              }
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={createSettlementMutation.isPending}
              className="w-full"
            >
              {createSettlementMutation.isPending ? 'Settling...' : 'Settle Up'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
