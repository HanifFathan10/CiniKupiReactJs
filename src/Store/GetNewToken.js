import { create } from "zustand";
import { RefreshToken } from "../services/AuthService";
import { createJSONStorage, persist } from "zustand/middleware";

const useGetNewToken = create(
  persist(
    (set) => ({
      isLoading: false,
      isSuccess: false,
      isError: false,

      getNewToken: async () => {
        set({ isLoading: true });
        await RefreshToken((status, res) => {
          if (status === true) {
            set({
              isLoading: false,
              isError: false,
              isSuccess: true,
            });

            sessionStorage.setItem("access_token", res.data.access_token);
          } else {
            set({
              isLoading: false,
              isSuccess: false,
              isError: true,
              error: res.response.data,
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
