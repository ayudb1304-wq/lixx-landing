import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "lixx-black": "#030303",
        "lixx-charge": "#FAFF00",
        "lixx-zen": "#B6A6E9",
        "lixx-dream": "#2D1B4E",
        "glass-panel": "rgba(255, 255, 255, 0.05)",
      },
      boxShadow: {
        "neon-blur": "0 0 10px rgba(250, 255, 0, 0.5)",
        "neon-blur-lg": "0 0 20px rgba(250, 255, 0, 0.6)",
        "neon-blur-xl": "0 0 30px rgba(250, 255, 0, 0.7)",
      },
      fontFamily: {
        display: ["var(--font-bungee)", "sans-serif"],
        body: ["var(--font-outfit)", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
