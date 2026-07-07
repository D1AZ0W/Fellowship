import type { Product } from "#/types/productType";
import { RatingHandler } from "./RatingHandler";

import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AddToCart } from "./AddToCart";

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
      <CardHeader className="space-y-3 grid grid-cols-1">
        <CardTitle className="line-clamp-2 min-h-14 text-center text-lg">
          {product.title}
        </CardTitle>
        <Badge variant="secondary" className="capitalize">
          {product.category}
        </Badge>
      </CardHeader>
      <CardTitle className="flex px-5 ">
        <Badge className="text-xl px-3 py-4">${product.price}</Badge>
      </CardTitle>

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
        <CardFooter onClick={(e) => e.preventDefault()}>
          <AddToCart product={product} />
        </CardFooter>
      </CardContent>
    </Card>
  );
}
