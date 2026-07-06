import { fetchCategoryProducts } from "#/services/productsService";
import { useQuery } from "@tanstack/react-query";

export const useFetchCategory = (category: string) => {
  const { data, isPending, isError, error } = useQuery({
    queryKey: ["category", category],
    queryFn: () => fetchCategoryProducts(category),
    enabled: category !== "all",
  });
  return { data, isPending, isError, error };
};
