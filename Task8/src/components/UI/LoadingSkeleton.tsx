export const UsersSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-3 lg:grid-cols-4">
    {Array.from({ length: 10 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
      >
        <header className="flex items-center gap-3 border-b border-gray-200 pb-3">
          <div className="space-y-2">
            <div className="h-4 w-32 rounded bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-200" />
          </div>
        </header>
        <div className="mt-3 space-y-3">
          <div className="flex justify-between">
            <div className="h-3 w-10 rounded bg-gray-200" />
            <div className="h-3 w-8 rounded bg-gray-200" />
          </div>

          <div className="flex justify-between">
            <div className="h-3 w-12 rounded bg-gray-200" />
            <div className="h-3 w-28 rounded bg-gray-200" />
          </div>

          <div className="flex justify-between">
            <div className="h-3 w-12 rounded bg-gray-200" />
            <div className="h-3 w-24 rounded bg-gray-200" />
          </div>

          <div className="flex justify-between">
            <div className="h-3 w-14 rounded bg-gray-200" />
            <div className="h-3 w-20 rounded bg-gray-200" />
          </div>
        </div>
      </div>
    ))}
  </div>
);

export const PostsSkeleton = () => (
  <div className="grid grid-cols-1 gap-4 p-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
    {Array.from({ length: 8 }).map((_, index) => (
      <div
        key={index}
        className="animate-pulse rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
      >
        <header className="mb-3 flex items-center justify-between border-b border-gray-200 pb-2">
          <div className="space-y-2">
            <div className="h-4 w-20 rounded bg-gray-200" />
            <div className="h-3 w-14 rounded bg-gray-200" />
          </div>
        </header>

        <div className="space-y-2">
          <div className="h-4 w-3/4 rounded bg-gray-200" />
          <div className="h-4 w-1/2 rounded bg-gray-200" />
        </div>

        <div className="mt-4 space-y-2">
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-full rounded bg-gray-200" />
          <div className="h-3 w-5/6 rounded bg-gray-200" />
        </div>
      </div>
    ))}
  </div>
);
