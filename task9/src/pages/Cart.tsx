import { useCart } from "#/hooks/useCart";
import { CartItem } from "#/components/CartItem";
import { CartSummary } from "#/components/CartSummary";
import { AlertMessage } from "#/components/AlertMessage";

export const Cart = () => {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <AlertMessage
        variant="default"
        title="Your cart is empty"
        message="Add some products to get started."
      />
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 p-6 lg:grid-cols-2">
      <div className="space-y-4">
        {items.map((item) => (
          <CartItem key={item.product.id} item={item} />
        ))}
      </div>
      <CartSummary />
    </div>
  );
};
