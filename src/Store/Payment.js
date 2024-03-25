import { create } from "zustand";
import { persist } from "zustand/middleware";

export const Payment = create(
  persist(
    (set) => ({
      transaction: [],
      resultPayment: (newTransaction) => {
        set((state) => ({
          transaction: [...state.transaction, newTransaction],
        }));
      },
    }),
    {
      name: "PAYMENT_RESULT",
    },
  ),
);
