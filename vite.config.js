import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/",
  server: {
    watch: {
      usePolling: true,
    },
  },
  define: {
    "process.env.VITE_BACKEND_URL": JSON.stringify(
      process.env.VITE_BACKEND_URL,
    ),
  },
});
