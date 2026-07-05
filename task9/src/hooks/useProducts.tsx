import { useQuery } from "@tanstack/react-query";
import { fetchProducts } from "#/services/productsService";

export const useProducts = () => {
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
