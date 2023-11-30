import { create } from "zustand";
import { persist } from "zustand/middleware";

export const addToCart = create(
  persist(
    (set) => ({
      cartItems: [],
      user: null,
      addToCart: (product) => {
        set((state) => ({ cartItems: [...state.cartItems, product] }));
      },
      removeFromCart: (name) => {
        set((state) => {
          const indexToRemove = state.cartItems.findIndex((cart) => cart.name === name);

          if (indexToRemove === -1) {
            return state;
          }

          const updatedCartItems = state.cartItems.filter((cart, i) => i !== indexToRemove);
          return { cartItems: updatedCartItems };
        });
      },
      addFromCart: (name) => {
        set((state) => ({ cartItems: [...state.cartItems, name] }));
      },
      login: (userData) => set({ user: userData }),
    }),
    {
      name: "ADD_TO_CART",
    }
  )
);
