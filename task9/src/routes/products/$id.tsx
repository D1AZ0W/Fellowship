import { ProductDetails } from "#/pages/ProductDetails";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/products/$id")({
  component: ProductDetails,
});
