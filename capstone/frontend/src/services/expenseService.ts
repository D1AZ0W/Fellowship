import { api } from '#/lib/axios'
import type { Expense, ExpenseDetails, PaginatedExpense } from '#/types/expense'

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

export const getUserExpenses = async (
  pageNumber = 1,
): Promise<PaginatedExpense> => {
  const res = await api.get('expenses/', { params: { page: pageNumber } })
  return res.data
}

export const getExpense = async (id: number): Promise<ExpenseDetails> => {
  const res = await api.get(`expenses/${id}/`)
  return res.data
}

export const editExpense = async (id: number, fromData: FormData) => {
  await api.patch(`expenses/${id}/edit/`, fromData)
}

export const deleteExpense = async (id: number) => {
  await api.delete(`expenses/${id}/delete/`)
}
