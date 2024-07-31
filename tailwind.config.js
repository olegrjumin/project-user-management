/** @type {import('tailwindcss').Config} */

import defaultTheme from "tailwindcss/defaultTheme";
module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
      },
      colors: {
        page: "#EDF2F7",
        brand: {
          50: "#475DE5",
        },
        gray: {
          10: "#F7FAFC",
          20: "",
          30: "#E2E8F0",
          40: "#CBD5E0",
          50: "#A0AEC0",
          60: "#718096",
          70: "#4A5568",
          80: "#2D3748",
          90: "#1A202C",
        },
        pink: {
          20: "#FEDDE6",
          80: "#922B6C",
        },
        purple: {
          20: "#EFE2FE",
          80: "#574195",
        },
        blue: {
          20: "#C8E7F9",
          80: "#2C5282",
        },
        orange: {
          20: "#FEEBC8",
          80: "#91472C",
        },
      },
      boxShadow: {
        custom: "0 1px 2px 0 rgba(45, 55, 72, 0.08)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
