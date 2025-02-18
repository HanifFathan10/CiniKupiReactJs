import { create } from "zustand";
import { GetAllOrders } from "../services/Order.service";

export type TTotalItems = {
  count: number;
  items: TDataOrder[];
  isLoading: boolean;
  useCount: VoidFunction;
};

export const totalItems = create<TTotalItems>((set) => ({
  count: 0,
  items: [],
  isLoading: false,
  useCount: async () => {
    const access_token = sessionStorage.getItem("access_token");
    if (!access_token) {
      return;
    }

    try {
      set({ isLoading: true });

      await GetAllOrders((status, res) => {
        if (status === true) {
          set((state) => ({
            ...state,
            items: res.data.data,
            count: res.data.data.length,
            isLoading: false,
          }));
        } else {
          set((state) => ({
            isLoading: false,
          }));
        }
      });
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
