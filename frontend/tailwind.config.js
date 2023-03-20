/** @type {import('tailwindcss').Config} */

module.exports = {
  content: ['./src/app/**/*.{html,js,ts}'],
  rippleui: {
		defaultStyle: false,
	},
  theme: {
    extend: {},
    container: {
      center: true
    }
  },
  plugins: [require("rippleui")]
}
// plugins: [require("rippleui")]