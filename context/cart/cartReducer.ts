import { CartState, ShippingAddress } from "./";
import { ICartProduct } from "@/interfaces";

type CartActionType =
  | {
      type: "[Cart] - LoadCart from cookies | storage";
      payload: ICartProduct[];
    }
  | { type: "[Cart] - Update cart"; payload: ICartProduct[] }
  | { type: "[Cart] - Update quantity cart"; payload: ICartProduct }
  | { type: "[Cart] - remove product in cart"; payload: ICartProduct }
  | { type: "[Cart] - LoadAddress from cookie"; payload: ShippingAddress }
  | { type: "[Cart] - update LoadAddress"; payload: ShippingAddress };

export const cartReducer = (
  state: CartState,
  action: CartActionType
): CartState => {
  switch (action.type) {
    case "[Cart] - LoadCart from cookies | storage":
      return {
        ...state,
        isLoaded: true,
        cart: [...action.payload],
      };

    case "[Cart] - Update cart":
      return {
        ...state,
        cart: [...action.payload],
      };

    case "[Cart] - Update quantity cart":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product._id !== action.payload._id) return product;
          if (product.size !== action.payload.size) return product;

          return action.payload;
        }),
      };

    case "[Cart] - remove product in cart":
      return {
        ...state,
        cart: state.cart.filter((product) => {
          if (
            product._id === action.payload._id &&
            product.size === action.payload.size
          ) {
            return false;
          }

          return true;
        }),
      };

    case "[Cart] - update LoadAddress":
    case "[Cart] - LoadAddress from cookie":
      return {
        ...state,
        shippingAdress: action.payload,
      };

    default:
      return state;
  }
};
