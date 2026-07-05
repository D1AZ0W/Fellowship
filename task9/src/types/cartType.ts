import type { Product } from "./productType";

export type Cart = {
  id: number;
  userId: number;
  date: string;
  products: CartItems[];
};
export type CartItems = {
  product: Pick<Product, "id" | "title" | "price" | "image">;
  quantity: number;
};
