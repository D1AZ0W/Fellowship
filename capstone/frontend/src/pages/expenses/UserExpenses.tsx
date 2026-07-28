import { Link } from '@tanstack/react-router'
import { useUserExpense } from '#/hooks/expense/useUserExpense'
import { ExpenseCard } from '#/components/expenses/ExpenseCard'

export const UserExpense = () => {
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useUserExpense()

  if (isPending) {
    return <p>Loading your expenses...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <div className="space-y-4">
      {data.pages.map((page) =>
        page.results.map((expense) => (
          <Link
            key={expense.id}
            to="/expenses/$id"
            params={{ id: expense.id.toString() }}
            className="block"
          >
            <ExpenseCard
              title={expense.title}
              paid_by={expense.paid_by.username}
              amount={expense.amount}
              category={expense.category}
              date={expense.expense_date}
              image={expense.image}
            />
          </Link>
        )),
      )}
      {hasNextPage && (
        <div className="flex justify-center py-4">
          <button
            onClick={() => fetchNextPage()}
            disabled={isFetchingNextPage}
            className="text-sm text-muted-foreground hover:text-foreground"
          >
            {isFetchingNextPage ? 'Loading...' : 'Load More'}
          </button>
        </div>
      )}
    </div>
  )
}
