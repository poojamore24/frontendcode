import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(0, 255, 255, 0.6), 0 0 40px rgba(255, 255, 0, 0.6)',
        'glow-pink': '0 0 20px rgba(255, 20, 147, 0.6), 0 0 40px rgba(255, 105, 180, 0.6)',
        'glow-green': '0 0 20px rgba(0, 255, 0, 0.6), 0 0 40px rgba(50, 205, 50, 0.6)',
        'glow-yellow': '0 0 20px rgba(255, 255, 0, 0.6), 0 0 40px rgba(255, 215, 0, 0.6)',
        'glow-hover-blue': '0 0 30px rgba(0, 255, 255, 0.8), 0 0 60px rgba(255, 255, 0, 0.8)',
        'glow-hover-pink': '0 0 30px rgba(255, 20, 147, 0.8), 0 0 60px rgba(255, 105, 180, 0.8)',
        'glow-hover-green': '0 0 30px rgba(0, 255, 0, 0.8), 0 0 60px rgba(50, 205, 50, 0.8)',
        'glow-hover-yellow': '0 0 30px rgba(255, 255, 0, 0.8), 0 0 60px rgba(255, 215, 0, 0.8)',
      },
    },
  },
  plugins: [],
};
export default config;
