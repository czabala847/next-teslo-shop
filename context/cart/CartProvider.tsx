import { useReducer } from "react";

import { ICartProduct } from "@/interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
};

interface ProviderProps {
  children: JSX.Element | JSX.Element[];
}

export const CartProvider: React.FC<ProviderProps> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, CART_INITIAL_STATE);

  const addToCart = (cartProduct: ICartProduct) => {
    const productFound = state.cart.some(
      ({ _id, size }) => _id === cartProduct._id && size === cartProduct.size
    );

    if (!productFound)
      return dispatch({
        type: "[Cart] - Update cart",
        payload: [...state.cart, cartProduct],
      });

    const newCart = state.cart.map((product) => {
      if (
        product._id === cartProduct._id &&
        product.size === cartProduct.size
      ) {
        return {
          ...product,
          quantity: product.quantity + cartProduct.quantity,
        };
      }

      return product;
    });

    dispatch({ type: "[Cart] - Update cart", payload: newCart });
  };

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
