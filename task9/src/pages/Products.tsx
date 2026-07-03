import { ProductSkeleton } from "#/components/LoadingSkeleton";
import { ProductCard } from "#/components/ProductCard";
import { fetchProducts } from "#/services/productsService";
import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";

export const Products = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: fetchProducts,
  });

  if (isLoading) {
    return <ProductSkeleton />;
  }

  if (isError) {
    return <h1>{error.message}</h1>;
  }

  return (
    <div>
      <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {products?.map((product) => (
          <Link to={`/products/${product.id}`.toString()}>
            <ProductCard key={product.id} product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};
