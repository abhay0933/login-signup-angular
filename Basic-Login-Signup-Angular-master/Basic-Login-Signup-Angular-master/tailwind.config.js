/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DBE9F6', 
        secondary: "#0069D1", 
        loginBlue: "#0069D1" 
      },
    },
  },
  plugins: [],
}
