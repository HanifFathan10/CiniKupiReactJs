import { create } from "zustand";
import { persist } from "zustand/middleware";

export const addToCart = create(
  persist(
    (set) => ({
      cartItems: [],
      addToCart: (product) => {
        set((state) => {
          const existingProductIndex = state.cartItems.findIndex(
            (item) => item.id === product.id
          );

          if (existingProductIndex !== -1) {
            const updatedCart = [...state.cartItems];
            updatedCart[existingProductIndex] = {
              ...updatedCart[existingProductIndex],
              quantity:
                updatedCart[existingProductIndex].quantity + product.quantity,
            };
            return { cartItems: updatedCart };
          } else {
            return { cartItems: [...state.cartItems, product] };
          }
        });
      },

      removeFromCart: (product) => {
        set((state) => {
          const indexToRemove = state.cartItems.findIndex(
            (cart) => cart.id === product.id
          );

          if (indexToRemove !== -1) {
            const prevProduct = [...state.cartItems];

            prevProduct[indexToRemove] = {
              ...prevProduct[indexToRemove],
              quantity: Math.max(
                0,
                prevProduct[indexToRemove].quantity - product.quantity
              ),
            };

            const updatedCartItems = prevProduct.filter(
              (item) => item.quantity > 0
            );

            return { cartItems: updatedCartItems };
          }

          return state;
        });
      },
    }),
    {
      name: "ADD_TO_CART",
    }
  )
);
