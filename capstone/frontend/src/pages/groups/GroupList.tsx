import { useGroups } from '#/hooks/groups/useGroups'
import { GroupCard } from '#/components/groups/GroupCard'
import { Button } from '#/components/ui/button'
import { Users } from 'lucide-react'
import { useState } from 'react'
import { CreateGroupForm } from '#/components/groups/CreateGroupForm'
import { Link } from '@tanstack/react-router'

export const GroupList = () => {
  const {
    data,
    isPending,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useGroups()
  const [open, setOpen] = useState(false)

  if (isPending) {
    return <p>Loading groups...</p>
  }

  if (isError) {
    return <p>{error.message}</p>
  }

  return (
    <div className="space-y-4">
      <Button
        className="p-5 cursor-pointer"
        variant="default"
        onClick={() => setOpen(true)}
      >
        {' '}
        Create Group <Users />{' '}
      </Button>
      <CreateGroupForm open={open} onOpenChange={setOpen} />
      {data.pages.map((page) =>
        page.results.map((group) => (
          <Link
            key={group.id}
            to="/groups/$id"
            params={{ id: group.id.toString() }}
            className="block"
          >
            <GroupCard
              name={group.name}
              type={group.type}
              image={group.image}
              createdAt={new Date(group.created_at).toLocaleDateString()}
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
