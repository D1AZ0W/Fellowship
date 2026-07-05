import { ProductSkeleton } from "#/components/LoadingSkeleton";
import { ProductCard } from "#/components/ProductCard";
import { Link } from "@tanstack/react-router";
import { useProducts } from "#/hooks/useProducts";
import { AlertMessage } from "#/components/AlertMessage";

export const Products = () => {
  const { products, isPending, isError, error } = useProducts();

  if (isPending) {
    return <ProductSkeleton />;
  }

  if (isError) {
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
        {products?.map((product) => (
          <Link
            key={product.id}
            to="/products/$id"
            params={{ id: product.id.toString() }}
          >
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
    </div>
  );
};
