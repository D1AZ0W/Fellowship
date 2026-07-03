import type { Product } from "#/types/productType";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RatingHandler } from "./RatingHandler";

type ProductCardProps = {
  product: Product;
};

export function ProductCard(prop: ProductCardProps) {
  const product = prop.product;
  return (
    <Card className="relative mx-auto w-full max-w-sm pt-0 max-h-120 h-full">
      <div className="absolute inset-0 z-30 aspect-video bg-black/35" />
      <img
        src={product.image}
        alt={product.title}

        className="relative z-20 aspect-video w-full object-cover brightness-60 dark:brightness-40"
      />
      <CardHeader className="flex grow flex-col justify-center items-center line-clamp-3 ">
        <CardTitle>{product.title}</CardTitle>
      </CardHeader>
      <CardAction className="flex px-3">
        <Badge variant="ghost">{product.category}</Badge>
        <Badge variant="default">${product.price}</Badge>
      </CardAction>
      <CardContent>
        <CardDescription className="line-clamp-3">
          {product.description}
        </CardDescription>
        <RatingHandler
          rate={product.rating.rate}
          count={product.rating.count}
        />
      </CardContent>
      <CardFooter>
        <Button className="w-full">Buy Now</Button>
      </CardFooter>
    </Card>
  );
}
