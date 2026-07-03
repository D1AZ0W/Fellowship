import { Products } from '#/pages/Products'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/products/')({
  component: Products,
})
