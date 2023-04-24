/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ["./src/**/*.{html,ts}"],
  rippleui: {
		defaultStyle: false,
	},
  corePlugins: {
    preflight: false,
   },
  theme: {
    extend: {
      // fontFamily: {
      //   "font-poppins": ['Poppins']
      // }
    },
    container: {
      center: true,
    }
  },
  plugins: [require("rippleui")]
}
// plugins: [require("rippleui")]