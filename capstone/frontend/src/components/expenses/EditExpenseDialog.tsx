import { useEffect, useState } from 'react'
import { useForm, useWatch } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'

import { useEditExpense } from '#/hooks/expense/useEditExpense'
import type { ExpenseDetails } from '#/types/expense'

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
import { editExpenseSchema } from '#/schemas/editExpenseSchema'
import type { EditExpenseForm } from '#/schemas/editExpenseSchema'

type Props = {
  open: boolean
  onOpenChange: (open: boolean) => void
  expense: ExpenseDetails
}

export const EditExpenseDialog = ({ open, onOpenChange, expense }: Props) => {
  const [image, setImage] = useState<File | null>(null)

  const editExpenseMutation = useEditExpense(expense.id)

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    control,
    watch,
  } = useForm<EditExpenseForm>({
    resolver: zodResolver(editExpenseSchema),
  })

  const watchSplitType = useWatch({
    control,
    name: 'split_type',
    defaultValue: 'Equal',
  })

  const watchedAmounts = watch('user_amounts')
  const totalAmount = watch('amount')
  const getAmountDifference = (ua: EditExpenseForm['user_amounts']) => {
    let amountLeft = 0
    const total =
      ua?.reduce((sum, item) => sum + (Number(item.amount) || 0), 0) ?? 0
    if (watchSplitType == 'Exact') {
      amountLeft = totalAmount - total
    } else {
      amountLeft = 100 - total
    }

    if (amountLeft === 0) {
      return {
        label: 'Perfectly split',
        color: 'text-green-500',
      }
    }
    return {
      label: `${amountLeft.toFixed(2)} remaining`,
      color: 'text-red-500',
    }
  }
  const amountStatus = getAmountDifference(watchedAmounts)

  useEffect(() => {
    if (open) {
      reset({
        title: expense.title,
        amount: Number(expense.amount),
        category: expense.category,
        split_type: expense.split_type,
        expense_date: expense.expense_date,
        note: expense.note ?? '',
        paid_by: expense.paid_by.id,
      })

      setImage(null)
    }
  }, [expense, open, reset])

  const onSubmit = (data: EditExpenseForm) => {
    const formData = new FormData()

    formData.append('title', data.title)
    formData.append('amount', data.amount.toString())
    formData.append('category', data.category)
    formData.append('split_type', data.split_type)
    formData.append('expense_date', data.expense_date)
    formData.append('note', data.note ?? '')
    formData.append('paid_by', data.paid_by.toString())
    formData.append('user_amounts', JSON.stringify(data.user_amounts))

    if (image) {
      formData.append('image', image)
    }
    for (const [key, value] of formData.entries()) {
      console.log(key, value)
    }

    editExpenseMutation.mutate(formData, {
      onSuccess: () => {
        setImage(null)
        onOpenChange(false)
      },
    })
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-auto">
        <DialogHeader>
          <DialogTitle>Edit Expense</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5 flex-1">
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-4 space-y-2">
              <Label>Title</Label>
              <Input type="text" {...register('title')} />
              {errors.title && (
                <p className="text-sm text-destructive">
                  {errors.title.message}
                </p>
              )}
            </div>

            <div className="col-span-2 space-y-2">
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

            <div className="col-span-2 space-y-2">
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

            <div className="space-y-2">
              <Label htmlFor="paid_by">Paid By</Label>

              <select
                id="paid_by"
                {...register('paid_by', {
                  valueAsNumber: true,
                })}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 text-sm"
              >
                {expense.participants.map((member) => (
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
              <Label>Note</Label>
              <Textarea {...register('note')} />
            </div>
          </div>

          {watchSplitType !== 'Equal' && (
            <div className="space-y-1">
              <Label>Split Amounts</Label>

              {watchedAmounts && (
                <span className={`text-sm ${amountStatus.color}`}>
                  {amountStatus.label}
                </span>
              )}
              <div className="grid grid-cols-2 gap-x-6 gap-y-3">
                {expense.participants.map((member) => {
                  const index = expense.participants.findIndex(
                    (m) => m.id === member.id,
                  )
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
            </div>
          )}
          {errors.user_amounts && (
            <p className="text-sm text-destructive">
              {errors.user_amounts.message}
            </p>
          )}
          <div className="space-y-2 grid grid-cols-2">
            <div className="row-span-2">
              <Label>Current Image</Label>{' '}
              {expense.image ? (
                <img
                  src={`${import.meta.env.VITE_BASE_URL}${expense.image}`}
                  alt={expense.title}
                  className="h-34 w-50 rounded-lg border object-cover"
                />
              ) : (
                <p className="text-sm text-muted-foreground">
                  No image uploaded
                </p>
              )}{' '}
            </div>
            <div className="row-span-2">
              <Label>Replace Image (Optional)</Label>{' '}
              <Input
                type="file"
                accept="image/*"
                onChange={(e) => setImage(e.target.files?.[0] ?? null)}
              />{' '}
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              disabled={editExpenseMutation.isPending}
              className="w-full"
            >
              {editExpenseMutation.isPending ? 'Saving...' : 'Save Changes'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
