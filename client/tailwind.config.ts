import { type Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      fontFamily: {
        inter: "var(--font-inter)",
        poppins: "var(--font-poppins)",
        lexend: "var(--font-lexend)",
        spaceGrotesk: "var(--font-spaceGrotesk)",
        manrope: "var(--font-manrope)",
      },
      keyframes: {
        "accordion-down": {
          from: {
            height: "0",
          },
          to: {
            height: "var(--radix-accordion-content-height)",
          },
        },
        "accordion-up": {
          from: {
            height: "var(--radix-accordion-content-height)",
          },
          to: {
            height: "0",
          },
        },
        marquee: {
          from: {
            transform: "translateX(0)",
          },
          to: {
            transform: "translateX(calc(-100% - var(--gap)))",
          },
        },
        "marquee-vertical": {
          from: {
            transform: "translateY(0)",
          },
          to: {
            transform: "translateY(calc(-100% - var(--gap)))",
          },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        marquee: "marquee var(--duration) infinite linear",
        "marquee-vertical": "marquee-vertical var(--duration) linear infinite",
      },
      colors: {
        primary: "#522546",
        dark: "#001f3f",
        secondary: "#f2f8ff",
        warning: "var(--color-warning)",
        success: "var(--color-success)",
        error: "var(--color-error)",
        main: "#1e3a8a",
        volume: "#B8B7FF",
        normal: "#606060",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
