import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { AxiosError } from "axios";
import { GetAllMenu } from "../services/Menu.service";

interface TuseMenuStore {
  menus: TDataMenu[];
  isLoading: boolean;
  getDataMenu: () => Promise<void>;
}

const useMenuStore = create<TuseMenuStore>()(
  persist(
    (set) => ({
      menus: [],
      isLoading: false,

      getDataMenu: async () => {
        try {
          const menus = localStorage.getItem("menu-store");

          if (JSON.parse(menus!).length > 0) {
            set({ menus: JSON.parse(menus!) });
          } else {
            await GetAllMenu((status, res) => {
              if (status === true) {
                set({ menus: res.data, isLoading: false });
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
      name: "menu-store",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useMenuStore;
