import { useCart } from "#/hooks/useCart";
import type { Product } from "#/types/productType";
import { isAuthenticated } from "#/utils/auth";
import { useNavigate } from "@tanstack/react-router";
import { Button } from "../ui/button";

type AddToCartProps = {
  product: Product;
};
export const AddToCart = ({ product }: AddToCartProps) => {
  const cart = useCart();
  const navigate = useNavigate();
  return (
    <Button
      className="flex-1"
      onClick={() =>
        isAuthenticated() ? cart.addToCart(product) : navigate({ to: "/login" })
      }
    >
      Add to Cart
    </Button>
  );
};
