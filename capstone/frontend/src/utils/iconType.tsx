import { Heart, Home, Notebook, Plane } from 'lucide-react'

export const iconType = (type: string) => {
  switch (type) {
    case 'Trip':
      return <Plane className="h-5 w-5" />

    case 'Home':
      return <Home className="h-5 w-5" />

    case 'Couple':
      return <Heart className="h-5 w-5" />

    case 'Other':
      return <Notebook className="h-5 w-5" />
  }
}
