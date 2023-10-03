import { createContext, useContext } from "react";
import { ICartProduct } from "@/interfaces";

interface ContextProps {
  cart: ICartProduct[];
  addToCart: (cartProduct: ICartProduct) => void;
  updateQuantityProductCart: (newProduct: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};
