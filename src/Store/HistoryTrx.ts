import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AxiosError } from "axios";
import { GetHistoryTransaction } from "../services/payment.service";

interface TuseHistoryTrx {
  historyTrx: TDataHistoryTrx[];
  currentPage: number;
  totalPage: number;
  isLoading: boolean;
  getHistoryTrx: (data: TQueryParamsHistoryTrx) => Promise<void>;
}

const useHistoryTrxStore = create<TuseHistoryTrx>()(
  persist(
    (set) => ({
      currentPage: 1,
      totalPage: 1,
      historyTrx: [],
      isLoading: false,

      getHistoryTrx: async (data) => {
        try {
          const historyTrx = localStorage.getItem("history-trx");

          if (JSON.parse(historyTrx!).length > 0) {
            set({ historyTrx: JSON.parse(historyTrx!) });
          } else {
            await GetHistoryTransaction((status, res) => {
              if (status === true) {
                set({
                  historyTrx: res.data.data,
                  currentPage: res.data.currentPage,
                  totalPage: res.data.totalPage,
                  isLoading: false,
                });
              }
            }, data);
          }
        } catch (error) {
          if (error instanceof Error) {
            console.log(error.message);
          } else if (error instanceof TypeError) {
            console.log(error.message);
          } else if (error instanceof AxiosError) {
            console.log(error.message);
          }
        }
      },
    }),
    {
      name: "history-trx",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useHistoryTrxStore;
