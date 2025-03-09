/** @type {import('tailwindcss').Config} */
const config = {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          spero: "#2d5b7c",
        },
      },
    },
    plugins: [],
  }
  
  module.exports = config