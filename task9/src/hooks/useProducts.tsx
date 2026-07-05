import { useQuery } from "@tanstack/react-query";
import { fetchIndvProducts, fetchProducts } from "#/services/productsService";

export const useFetchProduct = () => {
  const {
    data: products,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return { products, isPending, isError, error };
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
