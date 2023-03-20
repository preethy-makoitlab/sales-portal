/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/app/**/*.{html,js,ts}'],
  rippleui: {
		defaultStyle: false,
	},
  theme: {
    extend: {
      // fontFamily: {
      //   "font-poppins": ['Poppins']
      // }
    },
    container: {
      center: true
    }
  },
  plugins: [require("rippleui")]
}
// plugins: [require("rippleui")]