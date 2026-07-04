import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "#/services/productsService";

export const useProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });
  return { products, isLoading, isError, error };
};
