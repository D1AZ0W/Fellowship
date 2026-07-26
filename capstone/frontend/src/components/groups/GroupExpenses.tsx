import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'

export const GroupExpenses = () => {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <CardTitle>Expenses</CardTitle>
      </CardHeader>

      <Separator />

      {/* will do after ding expenses  */}
      <CardContent className="max-h-144 overflow-y-auto p-4">
        <div className="space-y-3">
          <div className="flex h-72 flex-col items-center justify-center text-center">
            <p className="text-lg font-medium">No expenses yet</p>

            <p className="mt-1 text-sm text-muted-foreground">
              Add your first expense to start splitting bills.
            </p>

            <Button className="mt-5">Add Expense</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
