import { createContext, useContext } from "react";
import { ICartProduct } from "@/interfaces";

interface ContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;
  addToCart: (cartProduct: ICartProduct) => void;
  updateQuantityProductCart: (newProduct: ICartProduct) => void;
  removeProductInCart: (product: ICartProduct) => void;
}

export const CartContext = createContext({} as ContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};
