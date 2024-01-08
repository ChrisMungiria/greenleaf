/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    extend: {
      colors: {
        midnight_green: "#19535F",
        skobeloff: "#0B7A75",
        dun: "#D7C9AA",
        falu_red: "#7B2D26",
        text_white: "#F0F3F5",
      },
    },
  },
  plugins: [],
};
