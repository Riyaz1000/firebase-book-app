/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        "protest-revolution": ["Protest Revolution", "sans-serif"],
        honk: ["Honk", "system-ui"],
        "rubik-doodle": ["Rubik Doodle Shadow", "system-ui"],
      },
    },
  },
  plugins: [],
};
