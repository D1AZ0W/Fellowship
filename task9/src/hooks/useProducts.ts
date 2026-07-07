import { useQuery } from "@tanstack/react-query";
import { fetchIndvProducts, fetchProducts } from "#/services/productsService";
import type { Product } from "#/types/productType";

export const useFetchProduct = () => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return { data, isPending, isError, error };
};

export const useFetchIndvProduct = (id: number) => {
  const {
    data: product,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id],
    queryFn: async () => fetchIndvProducts(id),
  });
  return { product, isPending, isError, error };
};

export const fetchLimited = async (pageParam: number): Promise<Product[]> => {
  const products = await fetchProducts();
  const start = (pageParam - 1) * 5;
  const end = pageParam * 5;
  return products.slice(start, end);
};
