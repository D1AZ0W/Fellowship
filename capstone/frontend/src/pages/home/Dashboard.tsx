import { useAuth } from '#/hooks/auth/useAuth'
import { useDashboard } from '#/hooks/dashboard/useDashboard'
import { AlertMessage } from '#/components/shared/AlertMessage'
import { DashboardGroupCard } from '#/components/dashboard/DashboardGroupCard'
import { SettlementCard } from '#/components/dashboard/SettlementCard'
import {
  MonthlySpendingChart,
  CategorySpendingChart,
} from '#/components/dashboard/DashboardCharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Link } from '@tanstack/react-router'

export const Dashboard = () => {
  const { user } = useAuth()
  const { data, isPending, isError, error } = useDashboard()

  if (isPending) {
    return (
      <div className="flex flex-col gap-6 p-2">
        <Skeleton className="h-10 w-72" />
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
          <Skeleton className="h-28" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Skeleton className="h-64 lg:col-span-2" />
          <Skeleton className="h-64" />
        </div>
      </div>
    )
  }

  if (isError) {
    return (
      <AlertMessage
        variant="destructive"
        title="Error loading dashboard"
        message={error}
      />
    )
  }

  const {
    summary,
    groups,
    suggested_transactions,
    monthly_report,
    category_report,
  } = data

  return (
    <div className="flex flex-col gap-6 p-2">
      <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold">
            Welcome back, {user?.first_name},
          </h1>
          <p className="text-muted-foreground">Here are your overall stats</p>
        </div>
        <div className="flex gap-2 mt-2 sm:mt-0">
          <Link to="/groups">
            <Button variant="outline">View Groups</Button>
          </Link>
          <Link to="/expenses">
            <Button variant="outline"> View Expense</Button>
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-border">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground">
              YOU ARE OWED
            </p>
            <p className="text-3xl font-bold text-emerald-600">
              Rs. {summary.owed.toLocaleString()}
            </p>
          </CardContent>
        </Card>

        <Card className="border-border">
          <CardContent className="p-5">
            <p className="text-sm font-medium text-muted-foreground ">
              YOU OWE
            </p>
            <p className="text-3xl font-bold text-red-500">
              Rs. {summary.owe.toLocaleString()}
            </p>
          </CardContent>
        </Card>
        {summary.net_balance >= 0 ? (
          <Card className="bg-primary text-primary-foreground border-0">
            <CardContent className="p-5">
              <p className="text-sm font-medium opacity-80">NET BALANCE</p>
              <p className="text-3xl font-bold">
                +Rs.{Math.abs(summary.net_balance).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        ) : (
          <Card className="bg-red-500 opacity-90 text-primary-foreground border-0">
            <CardContent className="p-5">
              <p className="text-sm font-medium opacity-80">NET BALANCE</p>
              <p className="text-3xl font-bold">
                - Rs.{Math.abs(summary.net_balance).toLocaleString()}
              </p>
            </CardContent>
          </Card>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        <Card className="lg:col-span-3 border-border">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Your Groups</CardTitle>
            <Link to="/groups">
              <Button variant="link" className="p-0 text-sm">
                View all
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            {groups.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">
                You are not part of any groups yet.
              </p>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {groups.slice(0, 6).map((group) => (
                  <DashboardGroupCard
                    key={group.id}
                    id={group.id}
                    name={group.name}
                    members={group.members}
                    balance={group.balance}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <Card className="lg:col-span-2 border-border">
          <CardHeader>
            <CardTitle>Settlements To Perform</CardTitle>
          </CardHeader>
          <CardContent>
            {suggested_transactions.length === 0 ? (
              <p className="text-muted-foreground text-sm text-center py-6">
                Settled Up!
              </p>
            ) : (
              <div className="space-y-3">
                {suggested_transactions.map((t, index) => (
                  <SettlementCard
                    key={index}
                    transaction={t}
                    currentUserId={user?.id ?? 0}
                  />
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlySpendingChart data={monthly_report} />
        <CategorySpendingChart data={category_report} />
      </div>
    </div>
  )
}
