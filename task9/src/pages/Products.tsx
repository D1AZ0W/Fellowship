import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { AlertMessage } from "#/components/AlertMessage";
import { ProductSkeleton } from "#/components/LoadingSkeleton";
import { ProductCard } from "#/components/ProductCard";
import { useInfiniteScroll } from "#/hooks/useInfiniteScroll";

import { Link } from "@tanstack/react-router";

export const Products = () => {
  const {
    data,
    isPending,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
  } = useInfiniteScroll();

  const { ref, inView } = useInView({
    threshold: 0,
  });

  useEffect(() => {
    if (inView && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, isFetchingNextPage, fetchNextPage]);

  if (isPending) {
    return <ProductSkeleton count={8} />;
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
    <div>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {data.map((product) => (
          <Link to="/products/$id" params={{ id: product.id.toString() }}>
            <ProductCard product={product} />
          </Link>
        ))}
      </div>

      <div ref={ref} className="h-10 flex justify-center">
        {isFetchingNextPage && <ProductSkeleton count={8} />}
      </div>
    </div>
  );
};
