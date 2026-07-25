export type Group = {
  id: number
  name: string
  image: string | null
  type: 'Trip' | 'Home' | 'Couple' | 'Other'
  created_at: string
}
export type GroupDetails = {
  id: number
  name: string
  image: string | null
  type: 'Trip' | 'Home' | 'Couple' | 'Other'
  created_at: string
  edited_at: string
  role: 'Owner' | 'Member'
}

export type PaginatedGroups = {
  count: number
  next: string | null
  previous: string | null
  results: Group[]
}
