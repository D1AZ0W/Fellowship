export const Home = () => {
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
        </div>

        <div className="flex-1 flex justify-center">
          <img
            src="/BillDiv.png"
            alt="BillDiv"
            className="w-full max-w-lg rounded-xl shadow-lg"
          />
        </div>
      </div>
    </div>
  )
}
