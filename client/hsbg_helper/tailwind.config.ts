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
        background: "var(--background)",
        foreground: "var(--foreground)",
        'brown-300': '#a2624a',
        'brown-100': '#E7D4A9',
        tierColor: {
          'S': '#FF7F7E',
          'A': '#FFBF7F',
          'B': '#FFDF80',
          'C': '#FEFF7F',
          'D': '#BEFF7F',
          'F': '#7EFF80',
        },
      },
    },
  },
  plugins: [],
};
export default config;
