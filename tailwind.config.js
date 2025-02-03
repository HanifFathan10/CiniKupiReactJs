/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/react-tailwindcss-datepicker/dist/index.esm.js",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/images/top-view-coffee-accessories-table.jpg')",
      },
      colors: {
        primary: "#0F0E0E",
        secondary: "#3F2D2D",
        teriary: "#B79D5E",
        dark: "#081225",
        light: {
          100: "#ffffff",
          200: "#F0F3F4",
          300: "#f1f5f9",
          400: "#B5C2CA",
        },
      },
      container: {
        center: true,
      },
    },
  },
};
