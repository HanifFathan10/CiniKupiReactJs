import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { getAllDefaultProduct } from "../services/product.service";
import { AxiosError } from "axios";

interface TuseDisplayProduct {
  dplProduct: TDataDefaultMenu[];
  isLoading: boolean;
  getDisplayProduct: () => Promise<void>;
}

const useDisplayProduct = create<TuseDisplayProduct>()(
  persist(
    (set) => ({
      dplProduct: [],
      isLoading: false,

      getDisplayProduct: async () => {
        try {
          const dplProductExist = localStorage.getItem("display-product");

          if (JSON.parse(dplProductExist!).length > 0) {
            set({ dplProduct: JSON.parse(dplProductExist!) });
          } else {
            await getAllDefaultProduct((status, res) => {
              if (status === true) {
                set({ dplProduct: res.data, isLoading: false });
              }
            });
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
      name: "display-product",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useDisplayProduct;
