/** @type {import('tailwindcss').Config} */
export const darkMode = "class";
export const content = ["./src/**/*.{js,jsx,ts,tsx}"];
export const theme = {
  extend: {
    gridTemplateColumns: {
      "13": "repeat(13, minmax(0, 1fr))",
    },
    fontFamily: {
      roboto: ['Roboto', 'sans-serif'],
      inter: ['Inter', 'sans-serif'],
    },
    colors: {
      green: {
        100: "var(--bg-color-100)",
        200: "var(--bg-color-200)",
        400: "var(--bg-color-400)",
        500: "var(--bg-color-500)",
        600: "var(--bg-color-600)",
        700: "var(--bg-color-700)",
      },
    },
    keyframes: {
      shimmer: {
        "100%": {
          transform: "translateX(100%)",
        },
      },
    },
  },
};
export const plugins = [];
