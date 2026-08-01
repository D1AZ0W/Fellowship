export type DashboardSummary = {
  owe: number
  owed: number
  net_balance: number
}

export type DashboardGroup = {
  id: number
  name: string
  members: number
  balance: number
}

export type SettlementTransaction = {
  payer: number
  payer_username: string
  recipient: number
  recipient_username: string
  amount: number
  group: {
    id: number
    name: string
  }
}

export type DashboardMonthlyReport = {
  month: string
  year: number
  total_spent: number
  total_expenses: number
}

export type DashboardCategoryReport = {
  category: string
  amount: number
}

export type DashboardData = {
  summary: DashboardSummary
  groups: DashboardGroup[]
  suggested_transactions: SettlementTransaction[]
  monthly_report: DashboardMonthlyReport[]
  category_report: DashboardCategoryReport[]
}
