import type { Product } from "#/types/productType";
import { api } from "./api";

export const fetchProducts = async () => {
  const res = await api.get<Product[]>("/products");
  return res.data;
};

export const fetchIndvProducts = async (id: number) => {
  const res = await api.get<Product>(`/products/${id}`);
  return res.data;
};
