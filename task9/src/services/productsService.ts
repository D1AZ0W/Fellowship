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

export const fetchCategories = async (): Promise<string[]> => {
  const res = await api.get<string[]>(`/products/categories`);
  return res.data;
};

export const fetchCategoryProducts = async (category: string) => {
  const res = await api.get<Product[]>(`/products/category/${category}`);
  return res.data;
};
