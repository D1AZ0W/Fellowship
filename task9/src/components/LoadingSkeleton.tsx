import { SkeletonCard } from "./SkeletonCard";

type ProductSkeletonProps = {
  count: number;
};
export const ProductSkeleton = ({ count }: ProductSkeletonProps) => {
  return (
    <div className="grid grid-cols-1 gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {Array.from({ length: count }).map((_, index) => (
        <SkeletonCard key={index} />
      ))}
    </div>
  );
};
