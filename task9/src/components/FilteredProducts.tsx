import { Link } from "@tanstack/react-router";
import { AlertMessage } from "./AlertMessage";
import { ProductCard } from "./ProductCard";
import { ProductSkeleton } from "./LoadingSkeleton";
import { useFetchProduct } from "#/hooks/useProducts";
import { useFetchCategory } from "#/hooks/useFetchCategory";

type FilteredProductsProps = {
  search: string;
  category: string;
};

export const FilteredProducts = ({
  search,
  category,
}: FilteredProductsProps) => {
  const allProductsResult = useFetchProduct();
  const categoryResult = useFetchCategory(category);

  const { data, isPending, isError, error } =
    category === "all" ? allProductsResult : categoryResult;

  const filteredProducts = (data ?? []).filter((product) =>
    product.title.toLowerCase().includes(search.trim().toLowerCase()),
  );

  if (isPending) {
    return <ProductSkeleton count={8} />;
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

  if (!data) {
    return (
      <AlertMessage
        variant="destructive"
        title="Error"
        message="Failed to load products."
      />
    );
  }

  if (filteredProducts.length === 0) {
    return (
      <AlertMessage
        variant="default"
        title="No Products Found"
        message="Try another search or category."
      />
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 px-20 py-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {filteredProducts.map((product) => (
        <Link
          key={product.id}
          to="/products/$id"
          params={{ id: product.id.toString() }}
        >
          <ProductCard product={product} />
        </Link>
      ))}
    </div>
  );
};
