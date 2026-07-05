import type { Product } from "#/types/productType";
import { RatingHandler } from "./RatingHandler";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Separator } from "@/components/ui/separator";

type ProductDetailsCardProps = {
  product: Product;
};

export const ProductDetailsCard = ({ product }: ProductDetailsCardProps) => {
  return (
    <Card className="mx-auto w-full max-w-6xl overflow-hidden p-6">
      <div className="grid gap-10 md:grid-cols-2">
        <div className="flex items-center justify-center rounded-lg bg-muted p-6">
          <AspectRatio ratio={1}>
            <img
              src={product.image}
              alt={product.title}
              className="h-full w-full object-contain"
            />
          </AspectRatio>
        </div>

        <CardContent className="flex flex-col justify-center space-y-6 p-0">
          <div className="space-y-3">
            <Badge>{product.category}</Badge>

            <h1 className="text-3xl font-bold">{product.title}</h1>

            <RatingHandler
              rate={product.rating.rate}
              count={product.rating.count}
            />
          </div>
          <Separator />
          <div>
            <h2 className="text-4xl font-bold text-primary">
              ${product.price}/-
            </h2>
          </div>
          <Separator />
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">Description</h3>
            <p className="leading-7 text-muted-foreground">
              {product.description}
            </p>
          </div>
          <div className="flex flex-col gap-3 pt-4 sm:flex-row">
            <Button className="flex-1">Add to Cart</Button>
            <Button variant="secondary" className="flex-1">
              Buy Now
            </Button>
          </div>
        </CardContent>
      </div>
    </Card>
  );
};
