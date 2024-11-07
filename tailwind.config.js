/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    colors: {
      white: "#FFFFFF",
      black: "#000000",
      primary: {
        light: "#F2F9FF",
        DEFAULT: "#007DFC",
        dark: "#0060C0",
      },
      red: "#AF3436",
      yellow: "#D1961F",
      green: "#34AF6F",
      gray: "#D9D9D9",
    },
    extend: {},
  },
  plugins: [],
};
