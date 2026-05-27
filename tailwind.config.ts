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
        ink: "#14151a",
        muted: "#b3bbbd",
        bg: "#fcfcfa",
        sage: "#777d70",
      },
      fontFamily: {
        serif: ["var(--font-lato)", "sans-serif"],
        sans: ["var(--font-lato)", "sans-serif"],
      },
      fontSize: {
        base: "16px",
      },
      letterSpacing: {
        tight: "-0.02em",
      },
      maxWidth: {
        layout: "1316px",
      },
      borderColor: {
        DEFAULT: "#b3bbbd",
      },
    },
  },
  plugins: [],
};

export default config;
