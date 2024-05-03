import { create } from "zustand";
import { persist } from "zustand/middleware";

type TAddToCart = {
  cartItems: any[];
  addToCart: (product: any) => void;
  removeFromCart: (product: any) => void;
};

export const addToCart = create(
  persist(
    (set): TAddToCart => ({
      cartItems: [],
      addToCart: (product) => {
        set((state: any) => {
          const existingProductIndex = state.cartItems.findIndex(
            (item: any) => item?.id === product?.id,
          );

          if (existingProductIndex !== -1) {
            const updatedCart = [...state.cartItems];
            const newQuantity =
              updatedCart[existingProductIndex].quantity + product.quantity;

            if (newQuantity <= 8) {
              updatedCart[existingProductIndex] = {
                ...updatedCart[existingProductIndex],
                quantity: newQuantity,
              };
              return { cartItems: updatedCart };
            } else {
              return { cartItems: state.cartItems };
            }
          } else {
            return { cartItems: [...state.cartItems, product] };
          }
        });
      },

      removeFromCart: (product) => {
        set((state: any) => {
          const indexToRemove = state.cartItems.findIndex(
            (cart: any) => cart?.id === product?.id,
          );

          if (indexToRemove !== -1) {
            const prevProduct = [...state.cartItems];

            prevProduct[indexToRemove] = {
              ...prevProduct[indexToRemove],
              quantity: Math.max(
                0,
                prevProduct[indexToRemove].quantity - product.quantity,
              ),
            };

            const updatedCartItems = prevProduct.filter(
              (item) => item.quantity > 0,
            );

            return { cartItems: updatedCartItems };
          }

          return state;
        });
      },
    }),
    {
      name: "ADD_TO_CART",
    },
  ),
);
