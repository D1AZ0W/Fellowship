import { useCart } from "#/hooks/useCart";
import { quantity } from "#/utils/quantity";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

export const CartSummary = () => {
  const { items, clearCart } = useCart();
  const subtotal = items.reduce(
    (total, item) => total + item.product.price * item.quantity,
    0,
  );

  return (
    <Card className="top-6 space-y-4 p-6">
      <h2 className="text-2xl font-bold">Order Summary</h2>
      <Separator />
      <div className="flex flex-col gap-3">
        <div className="flex justify-between text-xl font-bold">
          <span>Items</span>
          <span>{quantity(items)}</span>
        </div>
        <div className="flex justify-between text-xl font-bold">
          <span>Total</span>
          <span>${subtotal.toFixed(2)}</span>
        </div>
      </div>
      <Button className="w-full">Checkout</Button>
      <Button variant="outline" className="w-full" onClick={clearCart}>
        Clear Cart
      </Button>
    </Card>
  );
};
