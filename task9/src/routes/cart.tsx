import { createFileRoute, redirect } from "@tanstack/react-router";
import { Cart } from "#/pages/Cart";
import { isAuthenticated } from "#/utils/auth";

export const Route = createFileRoute("/cart")({
  beforeLoad: () => {
    if (!isAuthenticated()) {
      throw redirect({
        to: "/login",
      });
    }
  },

  component: Cart,
});
