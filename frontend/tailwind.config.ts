import { type Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    colors: {
      "bg-color": "#323437",
      "main-color": "#e2b714",
      "sub-color": "#646669",
      "base": "#000000",
      "base-light": "#ffffff",
      "base-red": "#eb0004"
    },
    extend: {
    },
  },
  plugins: [],
} satisfies Config;
