import { useContext } from "react";
import { CartContext } from "#/context/CartContext";

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("You can only use Card when logged in");
  }
  return context;
};
