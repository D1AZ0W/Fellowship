import { AlertMessage } from "#/components/AlertMessage";
import { ProductSkeleton } from "#/components/LoadingSkeleton";
import { ProductDetailsCard } from "#/components/ProductDetailsCard";
import { useFetchIndvProduct } from "#/hooks/useProducts";
import { Route } from "#/routes/products/$id";

export const ProductDetails = () => {
  const { id } = Route.useParams();
  const { product, isPending, isError, error } = useFetchIndvProduct(
    Number(id),
  );

  if (isPending) return <ProductSkeleton />;

  if (isError) {
    return <AlertMessage variant="destructive" title="Error" message={error} />;
  }

  if (!product)
    return (
      <AlertMessage
        variant="default"
        title="No data exists..."
        message="No data of requested item found"
      />
    );

  return <ProductDetailsCard product={product} />;
};
