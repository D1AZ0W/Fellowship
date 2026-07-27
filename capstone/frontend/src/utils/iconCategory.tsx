import {
  Clapperboard,
  UtensilsCrossed,
  Car,
  Zap,
  Wrench,
  LayoutGrid,
} from 'lucide-react'

export const iconType = (type: string) => {
  switch (type) {
    case 'Entertainment':
      return <Clapperboard className="h-5 w-5" />

    case 'Food':
      return <UtensilsCrossed className="h-5 w-5" />

    case 'Transportation':
      return <Car className="h-5 w-5" />

    case 'Utilities':
      return <Zap className="h-5 w-5" />

    case 'Services':
      return <Wrench className="h-5 w-5" />

    case 'General':
      return <LayoutGrid className="h-5 w-5" />
  }
}
