import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#0b1326",
        surface: "#131b2e",
        "surface-card": "#192238",
        "surface-border": "#273452",
        primary: "#6366f1",
        secondary: "#10b981",
        accent: "#06b6d4",
      },
    },
  },
  plugins: [],
};
export default config;
