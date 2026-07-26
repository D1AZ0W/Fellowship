import type { User } from './auth'

export type Group = {
  id: number
  name: string
  image: string | null
  type: 'Trip' | 'Home' | 'Couple' | 'Other'
  created_at: string
}
type Members = User & {
  role: 'Owner' | 'Member'
}
export type GroupDetails = {
  id: number
  name: string
  image: string | null
  type: 'Trip' | 'Home' | 'Couple' | 'Other'
  created_at: string
  edited_at: string
  role: 'Owner' | 'Member'
  members: Members[]
}

export type PaginatedGroups = {
  count: number
  next: string | null
  previous: string | null
  results: Group[]
}
