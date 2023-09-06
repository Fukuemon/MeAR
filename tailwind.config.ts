import { notojp } from "./src/utils/font";
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // font-**で呼び出すclass名 : フォント指定の配列
        notojp: ["var(--font-notojp)"],
        burtons: ["Burtons", "cursive"],
      },
      colors: {
        back: "#fffdf8",
        main: "#d8bd97",
        text: "#aa774c",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
    },
  },
  plugins: [],
};
export default config;
