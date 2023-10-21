/** @type {import('tailwindcss').Config} */
import daisyui from "daisyui";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      tablet: "799px",
      // => @media (min-width: 640px) { ... }
      smm: "640px",
      laptop: "1024px",
      // => @media (min-width: 1024px) { ... }

      phone: "400px",
      // => @media (min-width: 1280px) { ... }
      xl: { max: "1279px" },
      // => @media (max-width: 1279px) { ... }

      lg: { max: "1023px" },
      // => @media (max-width: 1023px) { ... }

      md: { max: "796px" },
      // => @media (max-width: 767px) { ... }

      sm: { max: "639px" },
      // => @media (max-width: 639px) { ... }
      ssm: { max: "399px" },
    },
  },
  plugins: [daisyui],
};
