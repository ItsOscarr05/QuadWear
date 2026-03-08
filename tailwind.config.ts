import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#7B2D8E", // JMU purple
          light: "#9B4DB0",
          dark: "#5A1F6A",
        },
        accent: {
          DEFAULT: "#CFB87C", // JMU gold
          light: "#E5D4A0",
          dark: "#B8A05A",
        },
        neutral: {
          offwhite: "#FEFBF8",
          charcoal: "#2D2D2D",
        },
      },
      fontFamily: {
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
        accent: ["var(--font-accent)", "cursive"],
      },
    },
  },
  plugins: [],
};
export default config;
