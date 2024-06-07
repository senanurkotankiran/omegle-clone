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
          'custom-gradient-1': 'linear-gradient(to bottom, #89bbf9, #3e87f7 100%)',
          'custom-gradient-2': 'linear-gradient(to bottom, #90b4e3, #3570d6)',

      },
      boxShadow: {
        'custom-inset': 'inset 0 0 24px #0006',
      },
    },
  },
  plugins: [],
};
export default config;
