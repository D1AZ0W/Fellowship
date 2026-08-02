import type { User } from './auth'

export type Activity = {
  id: number
  done_by: User
  activity_type:
    'GC' | 'GU' | 'MA' | 'MR' | 'ML' | 'EC' | 'EU' | 'ED' | 'SC' | 'TO'
  description: string
  created_at: string
  group: number
}
