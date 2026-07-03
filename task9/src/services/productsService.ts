import type { Product } from "#/types/productType";
import axios from "axios";

const api = axios.create({
  baseURL: "https://fakestoreapi.com",
});

export const fetchProducts = async () => {
  try {
    const res = await api.get<Product[]>("/products");
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log("Error while fetching products: " + error);
    return [];
  }
};

export const fetchIndvProducts = async (id: number) => {
  try {
    const res = await api.get<Product>(`/products/${id}`);
    return res.status === 200 ? res.data : [];
  } catch (error) {
    console.log("Error while fetching product with id: " + error);
    return [];
  }
};
