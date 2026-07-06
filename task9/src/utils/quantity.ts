import type { CartItems } from "#/types/cartType";

export const quantity = (items: CartItems[]) => {
  const totalItems: number = items.reduce(
    (total: number, item) => total + Number(item.quantity),
    0,
  );
  return totalItems;
};
