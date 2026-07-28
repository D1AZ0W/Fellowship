import { iconType } from '#/utils/iconType'
import { Card, CardContent } from '@/components/ui/card'

type GroupCardProps = {
  name: string
  type: string
  image?: string | null
  createdAt: string
}

export const GroupCard = ({ name, type, image, createdAt }: GroupCardProps) => {
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  })

  return (
    <Card className="cursor-pointer border-border transition-all hover:bg-accent">
      <CardContent className="flex items-center gap-4 p-3">
        <div className="flex h-16 w-20 shrink-0 items-center rounded-md justify-center overflow-hidden  bg-primary text-primary-foreground">
          {image ? (
            <img
              src={`${import.meta.env.VITE_BASE_URL}${image}`}
              alt={type}
              className="h-full w-full object-cover"
            />
          ) : (
            iconType(type)
          )}
        </div>

        <div className="min-w-0 space-y-1">
          <h3 className="truncate text-lg font-semibold text-foreground">
            {name}
          </h3>

          <p className="text-sm text-muted-foreground">
            {type} · Created {formattedDate}
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
