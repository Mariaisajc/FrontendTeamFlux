import type { Config } from "tailwindcss";

export default {
  content: ["./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
          "Apple Color Emoji",
          "Segoe UI Emoji",
          "Segoe UI Symbol",
          "Noto Color Emoji",
        ],
      },
      colors: {
        'deep-blue': '#000835',
        'light-blue': '#c5d5f9',
        'accent-blue': '#3a8bff',
      },
      boxShadow: {
        'destination': '18px 14px 0px 2px #3a8bff',
      },
    },
  },
  plugins: [],
} satisfies Config;