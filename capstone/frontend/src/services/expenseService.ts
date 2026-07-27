import { api } from '#/lib/axios'
import type { Expense } from '#/types/expense'

export const getGroupExpenses = async (
  groupId?: number,
): Promise<Expense[]> => {
  const res = await api.get(`expenses/group/${groupId}/`)
  return res.data
}

export const createExpense = async (data: FormData): Promise<Expense> => {
  const res = await api.post(`expenses/create/`, data)
  return res.data.expense
}
