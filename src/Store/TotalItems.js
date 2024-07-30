import { create } from "zustand";

export const totalItems = create((set) => ({
  count: 0,
  items: [],
  isLoading: false,
  useCount: async () => {
    const access_token = sessionStorage.getItem("access_token");
    if (!access_token) {
      return null;
    }

    try {
      set({ isLoading: true });

      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/order`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${access_token}`,
          },
        },
      );

      const data = await response.json();

      set((state) => ({
        ...state,
        items: data.data,
        count: data.data.length,
        isLoading: false,
      }));

      return data;
    } catch (error) {
      set({ isLoading: false });
      throw error;
    }
  },
}));
