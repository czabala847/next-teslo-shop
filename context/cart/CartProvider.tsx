import { useEffect, useReducer } from "react";
import Cookie from "js-cookie";

import { ICartProduct } from "@/interfaces";
import { CartContext, cartReducer } from "./";

export interface CartState {
  cart: ICartProduct[];
  isLoaded: boolean;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  isLoaded: false,
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

  const updateQuantityProductCart = (newProduct: ICartProduct) => {
    dispatch({ type: "[Cart] - Update quantity cart", payload: newProduct });
  };

  const removeProductInCart = (product: ICartProduct) => {
    dispatch({ type: "[Cart] - remove product in cart", payload: product });
  };

  useEffect(() => {
    try {
      const cartFromCookie = Cookie.get("cart");

      if (cartFromCookie) {
        const cartParse: ICartProduct[] = JSON.parse(cartFromCookie) || [];
        dispatch({
          type: "[Cart] - LoadCart from cookies | storage",
          payload: cartParse,
        });
      } else {
        dispatch({
          type: "[Cart] - LoadCart from cookies | storage",
          payload: [],
        });
      }
    } catch (error) {
      console.error("Cookie manipulada");
      dispatch({
        type: "[Cart] - LoadCart from cookies | storage",
        payload: [],
      });
    }
  }, []);

  useEffect(() => {
    if (state.cart.length > 0) {
      Cookie.set("cart", JSON.stringify(state.cart));
    }
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        updateQuantityProductCart,
        removeProductInCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
