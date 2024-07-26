/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Oswald", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Bebas Neue", "ui-serif", "Georgia", "Times", "serif"],
        monospace: ["DM Mono", "Liberation Mono", "Courier New", "monospace"],
      },
      colors: {
        black: "#0c0a09",
        white: "#fafaf9",
        gray: {
          400: "#a1a1aa",
          500: "#71717a",
          700: "#42414d",
          800: "#2b2a33",
          900: "#18181b",
        },
        green: "#62f06a",
        blue: "#58e9d3",
      },
      spacing: {
        1: "8px",
        2: "12px",
        3: "16px",
        4: "24px",
        5: "32px",
        6: "48px",
      },
      fontSize: {
        sm: "0.8rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.563rem",
        "3xl": "1.953rem",
        "4xl": "2.441rem",
        "5xl": "3.052rem",
      },
    },
  },
  plugins: [],
};
