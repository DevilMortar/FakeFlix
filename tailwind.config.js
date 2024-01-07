/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,ts}", // add this line
  ],
  theme: {
    extend: {
      colors: {
        'brand-color': '#d52727',
        'header-color': 'hsl(0, 0%, 7%)',
        'body-color-dark': 'hsl(0, 0%, 10%)',
        'body-color': 'hsl(0, 0%, 10%)',
        'body-color-light': 'hsl(0, 0%, 15%)',
        'black': 'hsl(0, 0%, 0%)',
        'white': 'hsl(0, 0%, 100%)',
        'pink': 'hsl(296, 100%, 50%)',
      },
    },
  },
  plugins: [],
}
