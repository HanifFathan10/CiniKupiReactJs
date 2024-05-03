import { create } from "zustand";
import { persist } from "zustand/middleware";

type TPayment = {
  transaction: any[];
  resultPayment: (newTransaction: any) => void;
};

export const Payment = create(
  persist(
    (set): TPayment => ({
      transaction: [],
      resultPayment: (newTransaction) => {
        set((state: any) => ({
          transaction: [...state.transaction, newTransaction],
        }));
      },
    }),
    {
      name: "PAYMENT_RESULT",
    },
  ),
);
