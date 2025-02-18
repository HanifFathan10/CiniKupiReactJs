import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AxiosError } from "axios";
import { GetAllCategory } from "../services/Category.service";

interface TuseCategoryStore {
  categories: TDataCategory[];
  isLoading: boolean;
  getDataCategories: () => Promise<void>;
}

const useCategoryStore = create<TuseCategoryStore>()(
  persist(
    (set) => ({
      categories: [],
      isLoading: false,

      getDataCategories: async () => {
        try {
          const menus = localStorage.getItem("menu-store");

          if (JSON.parse(menus!).length > 0) {
            set({ categories: JSON.parse(menus!) });
          } else {
            await GetAllCategory((status, res) => {
              if (status === true) {
                set({ categories: res.data, isLoading: false });
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
      name: "category-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useCategoryStore;
