import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AxiosError } from "axios";
import { getAllMenuProduct } from "../services/product.service";

interface TuseProductStore {
  products: TDataSingleProduct[];
  isLoading: boolean;
  getDataProduct: () => Promise<void>;
}

const useProductStore = create<TuseProductStore>()(
  persist(
    (set) => ({
      products: [],
      isLoading: false,

      getDataProduct: async () => {
        try {
          // const products = localStorage.getItem("product-store");

          // if (JSON.parse(products!).length > 0) {
          //   set({ products: JSON.parse(products!) });
          // } else {
          await getAllMenuProduct((status, res) => {
            if (status === true) {
              set({ products: res.data.data, isLoading: false });
            }
          });
          // }
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
      name: "product-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useProductStore;
