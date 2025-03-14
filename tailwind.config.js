/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
      extend: {
        colors: {
          'primary': '#8B0000',
          'secondary': '#F4E8D1',
        },
        fontFamily: {
          'display': ['Playfair Display', 'serif'],
          'body': ['Roboto', 'sans-serif'],
        }
      },
    },
    plugins: [],
  }