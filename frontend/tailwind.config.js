/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/app/components/**/*.{html,js,ts,jsx,tsx}',
  './src/app/pages/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [require("rippleui")]
}
