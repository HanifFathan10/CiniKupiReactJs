/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/images/hero-pattern.webp')",
      },
      colors: {
        primary: "#1f3933",
        secondary: "#cba258",
        green: "#00754a",
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
  plugins: [],
};
