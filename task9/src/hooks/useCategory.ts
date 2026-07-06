import { fetchCategories } from "#/services/productsService";
import { useQuery } from "@tanstack/react-query";

export const useCategory = () => {
  const {
    data: categories,
    isPending,
    isError,
    error,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });
  return { categories, isPending, isError, error };
};
