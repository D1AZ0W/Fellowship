import { useEffect } from "react";
import { Link } from "@tanstack/react-router";
import { useInView } from "react-intersection-observer";
import { AlertMessage } from "../sharedComponents/AlertMessage";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./LoadingSkeleton";
import { useInfiniteScroll } from "#/hooks/useInfiniteScroll";

export const InfiniteProducts = () => {
  const {
    data,
    isPending,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll();

  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return <ProductSkeleton count={5} />;
  }

  if (error) {
    return (
      <AlertMessage
        variant="destructive"
        title="Error Occurred"
        message={error}
      />
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 gap-6 px-20 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <Link
            key={product.id}
            to="/products/$id"
            params={{ id: product.id.toString() }}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      <div ref={ref} className="flex h-10 justify-center">
        {isFetchingNextPage && <ProductSkeleton count={8} />}
      </div>
    </>
  );
};
