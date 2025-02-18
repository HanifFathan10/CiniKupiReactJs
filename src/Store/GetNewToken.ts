import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { RefreshToken } from "../services/Auth.service";

interface IGetNewToken {
  isLoading?: boolean;
  isSuccess?: boolean;
  isError?: boolean;
  error?: any;
  getNewToken: () => Promise<void>;
  setIsError: () => void;
}

interface IResponseRefreshToken {
  status: boolean;
  message: string;
  access_token: string;
}

const useGetNewToken = create<IGetNewToken>()(
  persist(
    (set) => ({
      isLoading: false,
      isSuccess: false,
      isError: false,

      getNewToken: async () => {
        set({ isLoading: true });
        await RefreshToken((status: boolean, res: IResponseRefreshToken) => {
          if (status === true) {
            set({
              isLoading: false,
              isError: false,
              isSuccess: true,
            });

            sessionStorage.setItem("access_token", res.access_token);
          } else {
            set({
              isLoading: false,
              isSuccess: false,
              isError: true,
            });
          }
        });
      },

      setIsError: () => set({ isError: false }),
    }),
    {
      name: "get-new-token",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);

export default useGetNewToken;
