import { createContext, useContext } from "react";
import { ICartProduct } from "@/interfaces";
import { ShippingAddress } from ".";

interface ContextProps {
  cart: ICartProduct[];
  isLoaded: boolean;
  numberOfItems: number;
  shippingAdress?: ShippingAddress;
  subTotal: number;
  tax: number;
  total: number;

  addToCart: (cartProduct: ICartProduct) => void;
  createOrder: () => Promise<{ hasError: boolean; message: string }>;
  removeProductInCart: (product: ICartProduct) => void;
  updateQuantityProductCart: (newProduct: ICartProduct) => void;
  updateShippingAddress: (address: ShippingAddress) => void;
}

export const CartContext = createContext({} as ContextProps);

export const useCartContext = () => {
  return useContext(CartContext);
};
