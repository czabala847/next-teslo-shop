import { createContext, useContext } from "react";
import { ICartProduct } from "@/interfaces";
import { ShippingAddress } from ".";

interface ContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;

  shippingAdress?: ShippingAddress;

  addToCart: (cartProduct: ICartProduct) => void;
  updateQuantityProductCart: (newProduct: ICartProduct) => void;
  removeProductInCart: (product: ICartProduct) => void;
  updateShippingAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};
