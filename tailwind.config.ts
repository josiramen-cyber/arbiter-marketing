import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#F7F6F2",
        surface: "#FFFFFF",
        primary: "#2ECC8A",
        accent: "#C9A84C",
        text: "#0C0F14",
        "text-muted": "#6B7A8D",
        border: "#E5E4DE",
        danger: "#E05A5A",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        serif: ["Playfair Display", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
