import { createContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import type { CartItems } from "#/types/cartType";
import { toast } from "react-toastify";

type CartContextType = {
  items: CartItems[];
  addToCart: (item: CartItems["product"]) => void;
  removeFromCart: (id: number) => void;
  increaseQuantity: (id: number) => void;
  decreaseQuantity: (id: number) => void;
  clearCart: () => void;
};

export const CartContext = createContext<CartContextType | undefined>(
  undefined,
);

type CartProviderProps = {
  children: ReactNode;
};

export const CartProvider = ({ children }: CartProviderProps) => {
  const [items, setItems] = useState<CartItems[]>(() => {
    const storedCart = localStorage.getItem("cart");
    if (!storedCart) return [];
    try {
      return JSON.parse(storedCart) as CartItems[];
    } catch {
      return [];
    }
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items]);

  const addToCart = (product: CartItems["product"]) => {
    setItems((prev) => {
      const exists = prev.find((item) => product.id === item.product.id);
      if (exists) {
        return prev.map((item) =>
          product.id === item.product.id
            ? {
                ...item,
                quantity: item.quantity + 1,
              }
            : item,
        );
      }
      return [...prev, { product, quantity: 1 }];
    });
    toast.success("Added " + product.title + " to the cart");
  };

  const removeFromCart = (id: number) => {
    setItems((prev) => prev.filter((item) => item.product.id !== id));
  };

  const increaseQuantity = (id: number) => {
    setItems((prev) =>
      prev.map((item) =>
        item.product.id === id
          ? {
              ...item,
              quantity: item.quantity + 1,
            }
          : item,
      ),
    );
  };

  const decreaseQuantity = (id: number) => {
    setItems((prev) =>
      prev
        .map((item) =>
          item.product.id === id
            ? {
                ...item,
                quantity: item.quantity - 1,
              }
            : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const value = useMemo(
    () => ({
      items,
      addToCart,
      removeFromCart,
      increaseQuantity,
      decreaseQuantity,
      clearCart,
    }),
    [items],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
