import {
  Bar,
  BarChart,
  CartesianGrid,
  XAxis,
  Pie,
  PieChart,
  Label,
} from 'recharts'

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import type { ChartConfig } from '@/components/ui/chart'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart'
import type {
  DashboardMonthlyReport,
  DashboardCategoryReport,
} from '#/types/dashboard'
import { useMemo } from 'react'

const CHART_COLORS = [
  'var(--chart-1)',
  'var(--chart-2)',
  'var(--chart-3)',
  'var(--chart-4)',
  'var(--chart-5)',
]

export function MonthlySpendingChart({
  data,
}: {
  data: DashboardMonthlyReport[]
}) {
  const chartConfig = {
    total_spent: {
      label: 'Total Spent',
      color: 'var(--chart-1)',
    },
  } satisfies ChartConfig

  return (
    <Card className="flex flex-col h-full border-border">
      <CardHeader>
        <CardTitle>Monthly Spending</CardTitle>
        <CardDescription>Your expenses in the last 6 months</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer config={chartConfig} className="min-h-62 w-full">
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="month"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
              tickFormatter={(value) => value.slice(0, 3)}
            />
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Bar
              dataKey="total_spent"
              fill="var(--color-total_spent)"
              radius={8}
            />
          </BarChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}

export function CategorySpendingChart({
  data,
}: {
  data: DashboardCategoryReport[]
}) {
  const totalAmount = useMemo(
    () => data.reduce((acc, curr) => acc + curr.amount, 0),
    [data],
  )

  const chartConfig = useMemo(() => {
    return data.reduce((acc, curr, index) => {
      acc[curr.category] = {
        label: curr.category,
        color: CHART_COLORS[index % CHART_COLORS.length],
      }
      return acc
    }, {} as ChartConfig)
  }, [data])

  const chartData = useMemo(
    () =>
      data.map((d, i) => ({
        ...d,
        fill: CHART_COLORS[i % CHART_COLORS.length],
      })),
    [data],
  )

  if (data.length === 0) {
    return (
      <Card className="flex flex-col h-full border-border">
        <CardHeader>
          <CardTitle>Spending by Category</CardTitle>
          <CardDescription>This month's breakdown</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-1 items-center justify-center">
          <p className="text-muted-foreground text-sm">
            No expenses this month
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="flex flex-col h-full border-border">
      <CardHeader className="items-center pb-0">
        <CardTitle>Spending by Category</CardTitle>
        <CardDescription>This month's spendings</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square max-h-63"
        >
          <PieChart>
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie
              data={chartData}
              dataKey="amount"
              nameKey="category"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && 'cx' in viewBox && 'cy' in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-xl font-bold"
                        >
                          Rs. {totalAmount.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          This Month
                        </tspan>
                      </text>
                    )
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
