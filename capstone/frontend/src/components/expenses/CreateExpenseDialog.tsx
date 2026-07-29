import { useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useCreateExpense } from '#/hooks/expense/useCreateExpense'
import type { CreateExpenseForm } from '#/schemas/createExpenseSchema'
import { createExpenseSchema } from '#/schemas/createExpenseSchema'
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
  open: boolean

  onOpenChange: (open: boolean) => void
}

export const CreateExpenseDialog = ({
  groupId,
  members,
  open,
  onOpenChange,
}: Props) => {
  const [image, setImage] = useState<File | null>(null)
  const [participantIds, setParticipantIds] = useState<number[]>(
    members.map((member) => member.id),
  )

  const createExpenseMutation = useCreateExpense(groupId)

  const {
    register,
    handleSubmit,
    reset,
    getValues,
    formState: { errors },
    control,
  } = useForm<CreateExpenseForm>({
    resolver: zodResolver(createExpenseSchema),
  })

  const watchSplitType = useWatch({
    control,
    name: 'split_type',
    defaultValue: 'Equal',
  })

  const onSubmit = (data: CreateExpenseForm) => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('amount', data.amount.toString())
    formData.append('category', data.category)
    formData.append('split_type', data.split_type)
    formData.append('expense_date', data.expense_date)
    formData.append('note', data.note ?? '')
    formData.append('group', groupId.toString())
    formData.append('paid_by', data.paid_by.toString())
    if (watchSplitType !== 'Equal') {
      const userAmounts = getValues('user_amounts')
      userAmounts?.forEach((entry, index) => {
        formData.append(
          `user_amounts[${index}]user_id`,
          entry.user_id.toString(),
        )
        formData.append(`user_amounts[${index}]amount`, entry.amount.toString())
      })
    }

    if (image) {
      formData.append('image', image)
    }

    participantIds.forEach((id) =>
      formData.append('participants', id.toString()),
    )

    createExpenseMutation.mutate(formData, {
      onSuccess: () => {
        reset()
        setImage(null)
        setParticipantIds(members.map((member) => member.id))
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl max-h-screen overflow-scroll">
        <DialogHeader>
          <DialogTitle>Add Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1 ">
          <div className="space-y-2">
            <Label>Title</Label>
            <Input type="text" {...register('title')} />
            {errors.title && (
              <p className="text-sm text-destructive">{errors.title.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Amount</Label>

              <Input
                type="number"
                step="0.01"
                {...register('amount', {
                  valueAsNumber: true,
                })}
              />
              {errors.amount && (
                <p className="text-sm text-destructive">
                  {errors.amount.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Date</Label>
              <Input
                type="date"
                {...register('expense_date')}
                defaultValue={new Date().toISOString().split('T')[0]}
              />
              {errors.expense_date && (
                <p className="text-sm text-destructive">
                  {errors.expense_date.message}
                </p>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Category</Label>

              <select
                {...register('category')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3"
              >
                <option value="">Select an option</option>
                <option value="Food">Food</option>
                <option value="Entertainment">Entertainment</option>
                <option value="Transportation">Transportation</option>
                <option value="Utilities">Utilities</option>
                <option value="Services">Services</option>
                <option value="General">General</option>
              </select>
              {errors.category && (
                <p className="text-sm text-destructive">
                  {errors.category.message}
                </p>
              )}
            </div>

            <div className="space-y-2">
              <Label>Split Type</Label>
              <select
                {...register('split_type')}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3"
              >
                <option value="Equal">Equal</option>
                <option value="Exact">Exact</option>
                <option value="Percentage">Percentage</option>
              </select>
              {errors.split_type && (
                <p className="text-sm text-destructive">
                  {errors.split_type.message}
                </p>
              )}
            </div>
          </div>

          {watchSplitType !== 'Equal' && (
            <div className="space-y-1">
              <Label>Split Amounts</Label>

              {members.map((member) => {
                const index = members.findIndex((m) => m.id === member.id)
                return (
                  <div key={member.id} className="flex items-center gap-3">
                    <Label
                      htmlFor={`user_amounts.${index}.amount`}
                      className="w-24 shrink-0 truncate"
                    >
                      {member.first_name} {member.last_name}
                    </Label>

                    <div className="relative flex-1">
                      <Input
                        id={`user_amounts.${index}.amount`}
                        type="number"
                        step="0.01"
                        {...register(`user_amounts.${index}.amount`, {
                          valueAsNumber: true,
                        })}
                      />

                      {watchSplitType === 'Percentage' && (
                        <span className="absolute right-2 top-1/2 -translate-y-1/2 text-md text-muted-foreground">
                          %
                        </span>
                      )}
                    </div>

                    <input
                      type="hidden"
                      defaultValue={member.id}
                      {...register(`user_amounts.${index}.user_id`, {
                        valueAsNumber: true,
                      })}
                    />
                  </div>
                )
              })}
            </div>
          )}
          {errors.user_amounts && (
            <p className="text-sm text-destructive">
              {errors.user_amounts.message}
            </p>
          )}

          <div className="space-y-2">
            <Label htmlFor="paid_by">Paid By</Label>

            <select
              id="paid_by"
              {...register('paid_by', {
                valueAsNumber: true,
              })}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
            >
              {members.map((member) => (
                <option key={member.id} value={member.id}>
                  {member.first_name} {member.last_name}
                </option>
              ))}
            </select>

            {errors.paid_by && (
              <p className="text-sm text-destructive">
                {errors.paid_by.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label>Participants</Label>

            <div className="space-y-3">
              {members.map((member) => (
                <div key={member.id} className="flex items-center space-x-3">
                  <input
                    type="checkbox"
                    id={`member-${member.id}`}
                    defaultChecked
                    className="h-4 w-4 rounded border-input"
                    onChange={(e) => {
                      const checked = e.target.checked

                      setParticipantIds((prev) =>
                        checked
                          ? [...prev, member.id]
                          : prev.filter((id) => id !== member.id),
                      )
                    }}
                  />

                  <Label
                    htmlFor={`member-${member.id}`}
                    className="cursor-pointer"
                  >
                    {member.first_name} {member.last_name}
                  </Label>
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label>Note</Label>
            <Textarea {...register('note')} />
          </div>

          <div className="space-y-2">
            <Label>Receipt (Optional)</Label>

            <Input
              type="file"
              accept="image/*"
              onChange={(e) => setImage(e.target.files?.[0] ?? null)}
            />
          </div>

          <DialogFooter>
            <Button
              type="submit"
              disabled={createExpenseMutation.isPending}
              className="w-full"
            >
              {createExpenseMutation.isPending
                ? 'Creating...'
                : 'Create Expense'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
