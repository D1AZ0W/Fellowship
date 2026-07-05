import type { Product } from "#/types/productType";
import { RatingHandler } from "./RatingHandler";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="mx-auto flex h-full max-w-sm flex-col overflow-hidden rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl">
      <AspectRatio ratio={1} className="bg-muted">
        <img
          src={product.image}
          alt={product.title}
          className="h-full w-full object-contain p-6"
        />
      </AspectRatio>
      <CardHeader className="space-y-3">
        <CardAction className="flex justify-between">
          <Badge variant="secondary" className="capitalize">
            {product.category}
          </Badge>

          <Badge>${product.price}</Badge>
        </CardAction>

        <CardTitle className="line-clamp-2 min-h-14 text-center text-lg">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-1 flex-col gap-4">
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>

        <div className="mt-auto">
          <RatingHandler
            rate={product.rating.rate}
            count={product.rating.count}
          />
        </div>
      </CardContent>
    </Card>
  );
}
