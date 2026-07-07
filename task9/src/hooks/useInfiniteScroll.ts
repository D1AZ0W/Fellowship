import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchLimited } from "./useProducts";

export const useInfiniteScroll = () => {
  const {
    data,
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    error,
    isError,
    isPending,
  } = useInfiniteQuery({
    queryKey: ["products-infinite"],
    queryFn: ({ pageParam }) => fetchLimited(pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      return lastPage.length <= 5 ? allPages.length + 1 : undefined;
    },
  });
  return {
    hasNextPage,
    fetchNextPage,
    status,
    isFetchingNextPage,
    data: data?.pages.flat() ?? [],
    error,
    isError,
    isPending,
  };
};
