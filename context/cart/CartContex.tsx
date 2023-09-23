import { createContext, useContext } from "react";
import { ICartProduct } from "@/interfaces";

interface ContextProps {
  cart: ICartProduct[];
}

export const CartContext = createContext({} as ContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};
