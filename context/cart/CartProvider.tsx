import { useEffect, useReducer } from "react";
import Cookie from "js-cookie";

import { ICartProduct, IOrder } from "@/interfaces";
import { CartContext, cartReducer } from "./";
import { tesloApi } from "@/api";
import axios from "axios";

const IVA = 0.15;

export interface CartState {
  cart: ICartProduct[];
  isLoaded: boolean;
  numberOfItems: number;
  shippingAdress?: ShippingAddress;
  subTotal: number;
  tax: number;
  total: number;
}

export interface ShippingAddress {
  firstName: string;
  lastName: string;
  address: string;
  address2?: string;
  zip: string;
  city: string;
  country: string;
  phone: string;
}

const CART_INITIAL_STATE: CartState = {
  cart: [],
  isLoaded: false,
  shippingAdress: undefined,
  tax: 0,
  numberOfItems: 0,
  subTotal: 0,
  total: 0,
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

  const updateShippingAddress = (address: ShippingAddress) => {
    Cookie.set("addressData", JSON.stringify(address));
    dispatch({ type: "[Cart] - update LoadAddress", payload: address });
  };

  const createOrder = async (): Promise<{
    hasError: boolean;
    message: string;
  }> => {
    if (!state.shippingAdress) {
      throw new Error("No hay dirección de entrega");
    }

    const body: IOrder = {
      orderItems: state.cart.map((p) => ({
        ...p,
        size: p.size!,
      })),
      shippingAddress: state.shippingAdress,
      numberOfItems: state.numberOfItems,
      subTotal: state.subTotal,
      tax: state.tax,
      total: state.total,
      isPaid: false,
    };

    try {
      const { data } = await tesloApi.post<IOrder>("/orders", body);

      dispatch({ type: "[Cart] - Order complete" });
      Cookie.set("cart", JSON.stringify([]));

      return {
        hasError: false,
        message: data._id!,
      };
    } catch (error) {
      console.error("Error createOrder", error);
      if (axios.isAxiosError(error)) {
        return {
          hasError: true,
          message: error.response?.data.message,
        };
      }

      return {
        hasError: true,
        message: "Error no controlado hable con el administrador",
      };
    }
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

  useEffect(() => {
    try {
      const shippingAddress = Cookie.get("addressData");

      if (shippingAddress) {
        dispatch({
          type: "[Cart] - LoadAddress from cookie",
          payload: JSON.parse(shippingAddress),
        });
      }
    } catch (error) {
      console.error("Error [Cart] - LoadAddress from cookie", error);
    }
  }, []);

  useEffect(() => {
    const numberOfItems = state.cart.reduce(
      (prev, current) => current.quantity + prev,
      0
    );
    const subTotal = state.cart.reduce(
      (prev, current) => current.price * current.quantity + prev,
      0
    );
    const orderSummary = {
      numberOfItems,
      subTotal,
      tax: subTotal * IVA,
      total: subTotal * (IVA + 1),
    };

    dispatch({ type: "[Cart] - Update order summary", payload: orderSummary });
  }, [state.cart]);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        createOrder,
        removeProductInCart,
        updateQuantityProductCart,
        updateShippingAddress,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
