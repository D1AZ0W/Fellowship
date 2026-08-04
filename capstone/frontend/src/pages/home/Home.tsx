import { Button } from '#/components/ui/button'
import { useNavigate } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'

export const Home = () => {
  const navigate = useNavigate()
  return (
    <div className="min-h-120 flex items-center justify-center px-10 mt-3">
      <div className="flex flex-col md:flex-row items-center gap-12 max-w-7xl">
        <div className="flex-1 space-y-6">
          <h1 className="text-4xl font-bold">
            Welcome to BillDiv <br />{' '}
            <p className="text-muted-foreground">
              Your Personal Bill Spiltter App
            </p>
          </h1>

          <p className="text-lg text-muted-foreground">
            This is a bill splitter app where you and your friends can split the
            bill with no issues of calculating and dividing money manually.
          </p>
          <Button
            variant="default"
            className="p-6 rounded-md text-md cursor-pointer"
            onClick={() => {
              navigate({ to: '/login' })
            }}
          >
            Try now <ArrowRight />{' '}
          </Button>
        </div>

        <div className="flex-1 flex justify-center">
          <img src="/bill.png" alt="bil-image" className="w-full max-w-lg" />
        </div>
      </div>
    </div>
  )
}
