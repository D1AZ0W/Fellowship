import { api } from '#/lib/axios'

export const getBalance = async (id: number) => {
  const res = await api.get(`settlements/list/${id}/`)
  return res.data
}

export const createSettlement = async (data: FormData) => {
  const res = await api.post(`settlements/create/`, data)
  return res.data
}

export const listSuggested = async (id: number) => {
  const res = await api.get(`settlements/transactions/${id}/`)
  return res.data
}

export const getGroupBalance = async (id: number) => {
  const res = await api.get(`settlements/balance/${id}/`)
  return res.data
}

