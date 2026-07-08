import { Filters } from "#/components/productComponents/Filter";
import { Route } from "#/routes/products";
import { useNavigate } from "@tanstack/react-router";
import { FilteredProducts } from "#/components/productComponents/FilteredProducts";
import { InfiniteProducts } from "#/components/productComponents/InfiniteProducts";

export const Products = () => {
  const { search, category } = Route.useSearch();

  const navigate = useNavigate();

  const isFiltering = search.trim() !== "" || category !== "all";

  return (
    <div>
      <div className="px-20 py-6">
        <Filters
          search={search}
          category={category}
          onSearchChange={(value) =>
            navigate({
              to: "/products",
              search: (prev) => ({
                ...prev,
                search: value,
              }),
              replace: true,
            })
          }
          onCategoryChange={(value) =>
            navigate({
              to: "/products",
              search: (prev) => ({
                ...prev,
                category: value,
              }),
            })
          }
        />
      </div>

      {isFiltering ? (
        <FilteredProducts search={search} category={category} />
      ) : (
        <InfiniteProducts />
      )}
    </div>
  );
};
