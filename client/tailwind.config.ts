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
        geist: "var(--font-geist)",
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
      backgroundImage: {
        "text-gradient-nature": "linear-gradient(to right, #22c55e, #ef4444)",
        "text-gradient-sunset": "linear-gradient(to right, #eab308, #1e293b)",
        "text-gradient-storm": "linear-gradient(to right, #3b82f6, #ef4444)",
        "text-gradient-citrus": "linear-gradient(to right, #a3e635, #fde047)",
        "text-gradient-midnight": "linear-gradient(to right, #522546, #001f3f)",
      },
      colors: {
        primary: "#522546",
        dark: "#001f3f",
        secondary: "#f2f8ff",
        warning: "#FFE893",
        success: "#B9ECD5",
        error: "#FFD6B5",
        purple: "#D6C5FF",
        normal: "#606060",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
