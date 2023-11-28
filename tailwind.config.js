/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "hero-pattern": "url('/images/hero-pattern.webp')",
      },
      colors: {
        primary: '#1f3933',
        secondary: '#cba258',
        green: '#00754a',
        dark: '#212121',
        light: '#ffffff'
      }
    },
  },
  plugins: [],
};
