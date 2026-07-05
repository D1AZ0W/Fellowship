import type { CartItems } from "#/types/cartType";
import { useCart } from "#/hooks/useCart";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CartItemProps = {
  item: CartItems;
};

export const CartItem = ({ item }: CartItemProps) => {
  const cart = useCart();

  return (
    <Card className="flex items-center gap-4 p-4">
      <img
        src={item.product.image}
        alt={item.product.title}
        className="h-24 w-24 rounded-md object-contain"
      />

      <div className="flex flex-1 flex-col gap-2">
        <h3 className="line-clamp-2 font-semibold">{item.product.title}</h3>

        <p className="text-lg font-bold">${item.product.price}</p>

        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="outline"
            onClick={() => cart.decreaseQuantity(item.product.id)}
          >
            -
          </Button>

          <span className="w-8 text-center">{item.quantity}</span>

          <Button
            size="icon"
            variant="outline"
            onClick={() => cart.increaseQuantity(item.product.id)}
          >
            +
          </Button>

          <Button
            variant="destructive"
            className="ml-auto"
            onClick={() => cart.removeFromCart(item.product.id)}
          >
            Remove
          </Button>
        </div>
      </div>
    </Card>
  );
};
