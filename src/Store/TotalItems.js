import { create } from "zustand";

export const totalItems = create((set) => ({
  count: 0,
  items: [],
  isLoading: false,
  useCount: async () => {
    // Memeriksa apakah access_token tersedia
    const access_token = localStorage.getItem("access_token");
    if (!access_token) {
      // Jika tidak ada access_token, langsung kembalikan null
      return null;
    }

    try {
      // Memulai loading
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

      // Mengupdate state dengan respon yang sukses
      set((state) => ({
        ...state,
        items: data.data,
        count: data.data.length, // Mengatur count ke panjang array data
        isLoading: false,
      }));

      return data;
    } catch (error) {
      // Menghentikan loading dan menampilkan pesan error
      console.error("Error fetching data:", error);
      set({ isLoading: false });
      throw error;
    }
  },
}));
