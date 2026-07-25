import { Card, CardContent } from '@/components/ui/card'
import { Heart, Home, Notebook, Plane } from 'lucide-react'

type GroupCardProps = {
  name: string
  type: string
  createdAt: string
}

export const GroupCard = ({ name, type, createdAt }: GroupCardProps) => {
  return (
    <Card className="cursor-pointer border-border transition-all hover:bg-accent">
      <CardContent className="flex items-center p-5">
        <div className="flex items-center gap-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
            {type == 'Trip' && <Plane className="h-5 w-5" />}
            {type == 'Home' && <Home className="h-5 w-5" />}
            {type == 'Couple' && <Heart className="h-5 w-5" />}
            {type == 'Other' && <Notebook className="h-5 w-5" />}
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold text-foreground">{name}</h3>

            <p className="text-sm text-muted-foreground">
              Created : {createdAt}
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
