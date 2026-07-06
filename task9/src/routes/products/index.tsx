import { Products } from "#/pages/Products";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

export const Route = createFileRoute("/products/")({
  validateSearch: z.object({
    search: z.string().default(""),
    category: z.string().default("all"),
  }),
  component: Products,
});
